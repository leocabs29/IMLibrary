const express = require('express');
const app = express();
const booksRouter = require('./routes/booksRoute');
const cors = require('cors');  // Import cors
app.use(cors());  // Enable CORS
app.use(express.json());

// Default root route


// Route for /books
app.use('/books', booksRouter);
app.use('/add-book', booksRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
