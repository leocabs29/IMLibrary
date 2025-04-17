import React, { useState, useEffect } from "react";

function ManageBooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    id: 0,
    title: "",
    author: "",
    isbn: "",
    category: "",
    copies: 0,
    available: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", category: "Fiction", copies: 5, available: 3 },
    { id: 2, title: "1984", author: "George Orwell", isbn: "9780451524935", category: "Science Fiction", copies: 8, available: 6 },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", category: "Classic", copies: 4, available: 2 },
    { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", category: "Fiction", copies: 6, available: 4 },
    { id: 5, title: "Brave New World", author: "Aldous Huxley", isbn: "9780060850524", category: "Science Fiction", copies: 3, available: 1 },
  ]);

  // Filter books based on search term
  const displayedBooks = books.filter((book) =>
    [book.title, book.author, book.category].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenModal = (book = null) => {
    console.log("Opening modal...");  // Debugging line
    if (book) {
      setCurrentBook(book);
      setIsEditing(true);
    } else {
      setCurrentBook({
        id: Date.now(), // Unique ID for new book
        title: "",
        author: "",
        isbn: "",
        category: "",
        copies: 0,
        available: 0,
      });
      setIsEditing(false);
    }
    setIsModalOpen(true); // Set modal state to true
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal when called
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prevBook) => ({
      ...prevBook,
      [name]: name === "copies" || name === "available" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentBook.title || !currentBook.author || !currentBook.isbn || !currentBook.category) {
      alert("Please fill in all the required fields");
      return;
    }

    if (currentBook.available > currentBook.copies) {
      alert("Available copies cannot exceed total copies.");
      return;
    }

    if (isEditing) {
      setBooks(books.map((book) => (book.id === currentBook.id ? currentBook : book)));
    } else {
      setBooks([...books, currentBook]);
    }
    handleCloseModal(); // Close the modal after submit
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Manage Books</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}  // Trigger handleOpenModal when button is clicked
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Book
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Author", "ISBN", "Category", "Copies", "Available", "Actions"].map((header) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header === "Actions" ? "text-right" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.copies}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.available > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.available}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No books found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-gray-500 opacity-75" aria-hidden="true"></div>
    <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h3>
          <div className="space-y-4">
            {["title", "author", "isbn", "category"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  required
                  value={currentBook[field]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Copies</label>
                <input
                  type="number"
                  name="copies"
                  required
                  min="0"
                  value={currentBook.copies}
                  onChange={handleInputChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Available Copies</label>
                <input
                  type="number"
                  name="available"
                  required
                  min="0"
                  max={currentBook.copies}
                  value={currentBook.available}
                  onChange={handleInputChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white border rounded-md shadow-sm text-sm font-medium hover:bg-blue-700"
          >
            {isEditing ? "Save Changes" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default ManageBooks;
