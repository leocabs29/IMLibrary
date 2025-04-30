const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all books
router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(`

      SELECT 
      B.TITLE,
      B.AUTHOR,
      C.CATEGORY_NAME,
      B.ISBN,
      B.PUBLICATION_YEAR,
      COUNT(*) AS total_copies,
      SUM(CASE WHEN S.STATUS_ID NOT IN (4, 7 ) THEN 1 ELSE 0 END) AS available_copies
    FROM BOOKS B
    JOIN CATEGORY C ON B.CATEGORY_ID = C.CATEGORY_ID
    JOIN BOOK_STATUS S ON S.STATUS_ID = B.STATUS_ID
    GROUP BY 
      B.TITLE,
      B.AUTHOR,
      C.CATEGORY_NAME,
      B.ISBN,
      B.PUBLICATION_YEAR
    ORDER BY B.TITLE
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


router.get("/get", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(`
SELECT 
    B.BOOK_ID,
      B.TITLE,
      B.AUTHOR,
      C.CATEGORY_NAME,
      B.ISBN,
      B.PUBLICATION_YEAR,
      COUNT(*) AS total_copies,
      SUM(CASE WHEN S.STATUS_ID NOT IN (4, 7) THEN 1 ELSE 0 END) AS available_copies,
      LB.BRANCH_NAME
FROM BOOKS B
JOIN CATEGORY C ON B.CATEGORY_ID = C.CATEGORY_ID
JOIN BOOK_STATUS S ON S.STATUS_ID = B.STATUS_ID
JOIN LIBRARY_BRANCHES LB ON LB.BRANCH_ID = B.BRANCH_ID
GROUP BY 
B.BOOK_ID,
      B.TITLE,
      B.AUTHOR,
      C.CATEGORY_NAME,
      B.ISBN,
      B.PUBLICATION_YEAR,
      LB.BRANCH_NAME
ORDER BY B.TITLE

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

router.get("/borrowable", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(`SELECT 
  b.book_id,
  b.title,
  CASE 
    WHEN (
      SELECT bb.borrow_date 
      FROM borrowed_books bb 
      WHERE bb.book_id = b.book_id 
      AND ROWNUM = 1
    ) <= SYSDATE - 7 THEN 'Overdue'
    ELSE (
      SELECT s.status_name 
      FROM book_status s 
      WHERE s.status_id = b.status_id
    )
  END AS status_name,
  b.author,
  (
    SELECT u.full_name
    FROM users u
    WHERE u.user_id = (
      SELECT bb.user_id
      FROM borrowed_books bb
      WHERE bb.book_id = b.book_id 
      AND ROWNUM = 1
    )
  ) AS full_name,
  (
    SELECT bb.borrow_date
    FROM borrowed_books bb
    WHERE bb.book_id = b.book_id 
    AND ROWNUM = 1
  ) AS borrow_date,
  (
    SELECT bb.due_date
    FROM borrowed_books bb
    WHERE bb.book_id = b.book_id 
    AND ROWNUM = 1
  ) AS due_date,
  (
    SELECT bb.borrowed_id
    FROM borrowed_books bb
    WHERE bb.book_id = b.book_id 
    AND ROWNUM = 1
  ) AS borrowed_id
FROM books b
WHERE b.status_id IN (4, 7)
ORDER BY (
  SELECT bb.borrow_date 
  FROM borrowed_books bb 
  WHERE bb.book_id = b.book_id 
  AND ROWNUM = 1
)
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

// GET book reserve
router.get("/book-reservation", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(`SELECT 
  B.TITLE,
  B.BOOK_ID,
  U.USER_ID,
  U.FULL_NAME,
  BD.BORROW_DATE,
  BD.DUE_DATE,
  S.STATUS_NAME
FROM BOOKS B
JOIN CATEGORY C ON B.CATEGORY_ID = C.CATEGORY_ID
JOIN BOOK_STATUS S ON B.STATUS_ID = S.STATUS_ID
LEFT JOIN BORROWED_BOOKS BD ON BD.BOOK_ID = B.BOOK_ID
LEFT JOIN USERS U ON BD.USER_ID = U.USER_ID
WHERE S.STATUS_ID IN (4 , 7 ,2 )
ORDER BY B.TITLE

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

// Route to get the total count of borrowed books
router.get("/count-borrowed-books", async (req, res) => {
  let connection;

  try {
    // Get a connection from the connection pool
    connection = await db.getConnection();

    // Query to count all borrowed books with status_id 4 or 7 in the 'borrowed_books' table
    const result = await connection.execute(
      `SELECT COUNT(*) AS borrowed_books_count FROM borrowed_books`
    );

    // Log the result to check its structure
    console.log("Query Result:", result);

    // Check if result.rows is defined and properly accessed
    if (result.rows && result.rows[0]) {
      // The value is inside the first array of result.rows[0]
      const borrowedBooksCount = result.rows[0][0]; // Access the first element in the nested array
      console.log("Total Borrowed Books Count:", borrowedBooksCount);
      res.status(200).json({ borrowedBooksCount });
    } else {
      res.status(200).json({ borrowedBooksCount: 0 }); // If no records match the condition
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

// Route to get borrowed books by user ID
router.get("/borrowed-books/:userId", async (req, res) => {
  let connection;

  // Get user_id from the request parameters
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Get a connection from the connection pool
    connection = await db.getConnection();

    // Query to fetch borrowed books for the specific user
    const result = await connection.execute(
      `SELECT 
    b.book_id, 
    b.title, 
    CASE 
        WHEN bb.borrow_date <= SYSDATE - 7 THEN 'Overdue'
        ELSE s.status_name
    END AS status_name,
    b.author, 
    u.FULL_NAME,   
    bb.borrow_date, 
    bb.due_date,
    bb.borrowed_id,
    LB.BRANCH_NAME -- Added a comma before this line
FROM books b
JOIN book_status s ON b.status_id = s.status_id
JOIN borrowed_books bb ON b.book_id = bb.book_id
JOIN users u ON u.user_id = bb.user_id
JOIN LIBRARY_BRANCHES LB ON LB.BRANCH_ID = b.BRANCH_ID -- Ensure proper aliasing of b.BRANCH_ID
WHERE bb.user_id = :userId
ORDER BY bb.borrow_date`,
      [userId] // Pass the userId as a parameter to the query
    );

    // Check if any books were found for the given user
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No borrowed books found for this user" });
    }

    // Return the list of borrowed books
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching borrowed books:", err);
    res.status(500).json({ error: "Database error while fetching borrowed books", details: err.message });
  } finally {
    if (connection) {
      await connection.close(); // Close the connection
    }
  }
});


// Route to get the count of borrowed books by user ID
router.get("/count-borrowed-books/:userId", async (req, res) => {
  let connection;

  // Get user_id from the request parameters
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Get a connection from the connection pool
    connection = await db.getConnection();

    // Query to count borrowed books for the specific user
    const result = await connection.execute(
      `SELECT COUNT(*) AS borrowed_books_count
       FROM borrowed_books bb
       WHERE bb.user_id = :userId`, // Filter by user_id
      [userId] // Pass the userId as a parameter
    );

    // Log the result to check its structure
    console.log("Query Result:", result);

    // Check if result.rows is defined and properly accessed
    if (result.rows && result.rows[0]) {
      // The value is inside the first element of result.rows[0]
      const borrowedBooksCount = result.rows[0][0]; // Access the first element in the nested array
      console.log("Total Borrowed Books Count for User:", borrowedBooksCount);
      res.status(200).json({ borrowedBooksCount });
    } else {
      res.status(200).json({ borrowedBooksCount: 0 }); // If no borrowed books
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





// Add new book
router.post("/add", async (req, res) => {
  const { title, author, isbn, publicationYear, categoryId, campus , statusId } = req.body;
  console.log(req.body);
  
  // Basic validation
  if (!title || !author || !isbn || !publicationYear || !categoryId ||  !campus || !statusId) {
      return res.status(400).json({ error: "All fields are required" });
  }

  let connection;

  try {
      connection = await db.getConnection();

      // Insert the new book into the books table
      const result = await connection.execute(
          `INSERT INTO BOOKS (TITLE, AUTHOR, ISBN, PUBLICATION_YEAR, CATEGORY_ID, BRANCH_ID, STATUS_ID)
           VALUES (:title, :author, :isbn, :publicationYear, :categoryId, :campus, :statusId)`,
          {
              title,
              author,
              isbn,
              publicationYear,
              categoryId,
              campus,
              statusId,
          }
      );

      // Commit the transaction
      await connection.commit();

      // Respond with success message
      res.status(201).json({ message: "Book added successfully" });

  } catch (err) {
      console.error(err);
      // If there's an error, rollback the transaction
      if (connection) {
          await connection.rollback();
      }
      res.status(500).json({ error: "Database error while adding book" });
  } finally {
      if (connection) {
          await connection.close();
      }
  }
});

router.put('/status/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  if (!bookId) {
    return res.status(400).json({ error: 'Book ID is required.' });
  }

  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `UPDATE books SET status_id = 2 WHERE book_id = :bookId`,
      { bookId },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ message: 'Status updated to 2 successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error.' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});


// Route to get books with status 2 or 3
router.get("/reservations", async (req, res) => {
  let connection;

  try {
    // Get a connection from the pool
    connection = await db.getConnection();

    // SQL query with no parameters, just filtering by status_id
    const result = await connection.execute(
      `SELECT 
         B.TITLE, 
         S.STATUS_NAME, 
         LB.BRANCH_NAME
       FROM BOOKS B
       JOIN BOOK_STATUS S ON B.STATUS_ID = S.STATUS_ID
       JOIN LIBRARY_BRANCHES LB ON LB.BRANCH_ID = B.BRANCH_ID
       WHERE S.STATUS_ID IN (2, 3)`
    );

    if (result.rows && result.rows.length > 0) {
      res.status(200).json({ reservations: result.rows });
    } else {
      res.status(200).json({ reservations: [] });
    }
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Database error while fetching reservations", details: err.message });
  } finally {
    if (connection) {
      await connection.close(); // Always release the connection
    }
  }
});


module.exports = router;
