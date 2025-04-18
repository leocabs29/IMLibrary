const express = require("express");
const router = express.Router();
const db = require("../db");



router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result =
      await connection.execute(`
SELECT 
    U.USER_ID,
  U.FIRST_NAME || ' ' || U.LAST_NAME AS NAME, 
  U.EMAIL, 
  UR.ROLE_NAME, 
  US.STATUS_NAME, 
  U.MEMBERSHIP_DATE
FROM USERS U
JOIN USERROLE UR ON UR.ROLE_ID = U.ROLE_ID
JOIN USER_STATUS US ON US.USTATUS_ID = U.USTATUS_ID

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


module.exports = router;