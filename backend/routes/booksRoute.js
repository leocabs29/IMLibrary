const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all books
router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result =
      await connection.execute(`SELECT B.TITLE , B.AUTHOR , B.ISBN , B.PUBLISHER , B.YEAR_PUBLISHED , C.CATEGORY_NAME , CS.CAMPUS_NAME , S.STATUS_NAME FROM BOOKS B
JOIN CATEGORY C ON B.CATEGORY_ID = C.CATEGORY_ID
JOIN CAMPUS CS ON B.CAMPUS_ID =  CS.CAMPUS_ID
JOIN STATUS S ON S.STATUS_ID = B.STATUS_ID`);
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
