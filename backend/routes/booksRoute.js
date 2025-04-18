const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all books
router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result =
      await connection.execute(`SELECT 
  B.TITLE,
  B.AUTHOR,
  C.CATEGORY_NAME,
  B.ISBN,
  B.YEAR_PUBLISHED,
  COUNT(*) AS total_copies,
  SUM(CASE WHEN S.STATUS_ID NOT IN (4, 7) THEN 1 ELSE 0 END) AS available_copies
FROM BOOKS B
JOIN CATEGORY C ON B.CATEGORY_ID = C.CATEGORY_ID
JOIN STATUS S ON S.STATUS_ID = B.STATUS_ID
GROUP BY 
  B.TITLE,
  B.AUTHOR,
  C.CATEGORY_NAME,
  B.ISBN,
  B.YEAR_PUBLISHED
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
    const result =
      await connection.execute(`SELECT 
  b.book_id, 
  b.title, 
  s.status_name, 
  b.author, 
  u.first_name || ' ' || u.last_name AS name,   -- Concatenating first and last name
  bb.borrow_date, 
  bb.due_date,
  bb.borrowed_id
FROM books b
JOIN status s ON b.status_id = s.status_id
JOIN borrowed_books bb ON b.book_id = bb.book_id
JOIN users u ON u.user_id = bb.user_id
WHERE s.status_id IN (4, 7)`);
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
