const express = require('express');
const app = express();
const booksRouter = require('./routes/booksRoute');
const usersRouter = require('./routes/userRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Library API!');
});

app.use('/books', booksRouter); // This should handle all book-related routes
app.use('/users', usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});