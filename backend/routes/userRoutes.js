const express = require("express");
const router = express.Router();
const db = require("../db");



router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result =
      await connection.execute(`
SELECT U.USER_ID , U.FULL_NAME , U.EMAIL , UR.ROLE_NAME ,US.USERSTATUS_NAME ,  U.CREATED_AT FROM USERS U
JOIN USER_ROLE UR ON UR.ROLE_ID = U.ROLE_ID
JOIN USER_STATUS US ON US.USERSTATUS_ID = U.USERSTATUS_ID
WHERE UR.ROLE_ID = 2
`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

router.put('/status/update/:id', async (req, res) => {
  const userId = req.params.id;
  const { userstatus_id } = req.body;

  let connection;

  try {
    connection = await db.getConnection(); // Get a connection from the pool
    const query = `
      UPDATE users
      SET userstatus_id = :userstatus_id
      WHERE user_id = :user_id
    `;
    
    // Use connection.execute() to run the query with parameters
    const result = await connection.execute(
      query,
      { userstatus_id, user_id: userId }, // Use named bindings for parameters
      { autoCommit: true } // Auto-commit the transaction after the update
    );

    res.status(200).json({ message: 'User status updated successfully!' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  } finally {
    if (connection) {
      await connection.close(); // Always close the connection
    }
  }
});


router.get("/count-users", async (req, res) => {
  let connection;

  try {
    // Get a connection from the connection pool
    connection = await db.getConnection();

    // Query to count all borrowed books with status_id 4 or 7 in the 'borrowed_books' table
    const result = await connection.execute(
      `SELECT COUNT(*) AS users_count FROM users`
    );

    // Log the result to check its structure
    console.log("Query Result:", result);

    // Check if result.rows is defined and properly accessed
    if (result.rows && result.rows[0]) {
      // The value is inside the first array of result.rows[0]
      const usersCount = result.rows[0][0]; // Access the first element in the nested array
      console.log("Total users count:", usersCount);
      res.status(200).json({ usersCount });
    } else {
      res.status(200).json({ usersCount: 0 }); // If no records match the condition
    }
  } catch (err) {
    console.error("Error fetching borrowed books count:", err);
    res.status(500).json({ error: "Database error while fetching borrowed books count", details: err.message });
  } finally {
    if (connection) {
      await connection.close(); // Close the connection
    }
  }
});


// Route to log in a user
router.post("/login", async (req, res) => {
  let connection;

  const { email, password, mpin } = req.body;

  if (!email || !password || !mpin) {
    return res.status(400).json({ error: "Email, password, and MPIN are required" });
  }

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `SELECT U.USER_ID, U.EMAIL, U.PASSWORD, U.MPIN, UR.ROLE_NAME 
       FROM USERS U
       JOIN USER_ROLE UR ON U.ROLE_ID = UR.ROLE_ID
       WHERE U.EMAIL = :email`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Since password is not hashed yet, directly compare
    if (user[2] !== password) { // user[2] = PASSWORD column
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Also check MPIN
    if (user[3] !== mpin) { // user[3] = MPIN column
      return res.status(401).json({ error: "Incorrect MPIN" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        user_id: user[0],
        email: user[1],
        role: user[4]
      }
    });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Database error during login" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

router.get("/:id", async (req, res) => {
  let connection;
  const { id } = req.params; // Get the ID from URL params

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
      SELECT 
        U.USER_ID, 
        U.FULL_NAME, 
        U.EMAIL, 
        UR.ROLE_NAME, 
        US.USERSTATUS_NAME,  
        U.CREATED_AT 
      FROM USERS U
      JOIN USER_ROLE UR ON UR.ROLE_ID = U.ROLE_ID
      JOIN USER_STATUS US ON US.USERSTATUS_ID = U.USERSTATUS_ID
      WHERE UR.ROLE_ID = 2 OR UR.ROLE_ID = 1
        AND U.USER_ID = :id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]); // return only the first row
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


module.exports = router;