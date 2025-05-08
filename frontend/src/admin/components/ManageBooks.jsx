import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // For better notifications
import axios from "axios";

function ManageBooks() {
  const [message, setMessage] = useState(""); // Add this line to define message state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    yearPublished: "",
    campus: "",
    copies: 0,
    available: 0,
    statusId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch books from the backend
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/books/");
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      const data = await response.json();

      // Transform the data to a more usable format
      const transformedData = data.map((book, index) => ({
        id: book[0]  , // Using index as ID temporarily - ideally should come from backend
        title: book[1],
        author: book[2],
        category: book[3],
        isbn: book[4],
        yearPublished: book[5],
        copies: book[6],
        available: book[7],
        branch: book[8]
      }));

      setBooks(transformedData);
      console.log(transformedData)
      setError(null);
    } catch (err) {
      setError(`Error fetching books: ${err.message}`);
      toast.error(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };

  // Filter and sort books
  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.category, book.isbn].some((field) =>
      (String(field) || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const fieldA =
      a[sortField] !== undefined ? a[sortField].toString().toLowerCase() : "";
    const fieldB =
      b[sortField] !== undefined ? b[sortField].toString().toLowerCase() : "";

    if (sortDirection === "asc") {
      return fieldA.localeCompare(fieldB);
    } else {
      return fieldB.localeCompare(fieldA);
    }
  });

  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const handleOpenModal = (book = null) => {
    if (book) {
      setCurrentBook({ ...book });
      setIsEditing(true);
    } else {
      setCurrentBook({
        id: Date.now(),
        title: "",
        author: "",
        isbn: "",
        category: "",
        yearPublished: "",
        campus: "",
        copies: 0,
        available: 0,
        statusId: 1,
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
  

  const validateForm = () => {
    const errors = [];

    if (!currentBook.title.trim()) errors.push("Title is required");
    if (!currentBook.author.trim()) errors.push("Author is required");
    if (!currentBook.isbn.trim()) errors.push("ISBN is required");
    if (!currentBook.category.trim()) errors.push("Category is required");

    if (currentBook.copies < 0) errors.push("Copies cannot be negative");
    if (currentBook.available < 0)
      errors.push("Available copies cannot be negative");
    if (currentBook.available > currentBook.copies)
      errors.push("Available copies cannot exceed total copies");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation of form before submission (optional)
    if (!validateForm()) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const bookData = {
      title: currentBook.title,
      author: currentBook.author,
      isbn: currentBook.isbn,
      publicationYear: currentBook.yearPublished,
      categoryId: parseInt(currentBook.category, 10), // Ensure category is an integer
      campus: parseInt(currentBook.campus, 10), // Ensure campus is an integer
      statusId: currentBook.statusId, // Make sure statusId is valid
    };

    try {
      setLoading(true); // Set loading to true while the request is being processed

      // Sending the POST request to the backend
      const response = await axios.post(
        "http://localhost:3000/books/add",
        bookData
      );

      // Handle successful response
      if (response.status === 201) {
        setMessage("Book added successfully!");
        toast.success("Book added successfully!");

        // Reset the form or modal after success
        setCurrentBook({
          title: "",
          author: "",
          isbn: "",
          yearPublished: "",
          category: "", // Reset category
          campus: "", // Reset campus
          statusId: "", // Reset statusId
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Error adding book. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete book");

        toast.success("Book deleted successfully!");
        fetchBooks();
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Column definitions for better maintainability
  const columns = [
    { field: "title", label: "Title" },
    { field: "author", label: "Author" },
    { field: "isbn", label: "ISBN" },
    { field: "category", label: "Category" },
    { field: "campus", label: "Campus" },
    { field: "yearPublished", label: "Year" },
    { field: "copies", label: "Copies" },
    { field: "available", label: "Available" },
    { field: "actions", label: "Actions" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Books</h2>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md w-full sm:w-auto justify-center"
            disabled={loading}
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Book
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded mb-6">
          <p>{error}</p>
          <button className="mt-2 text-sm underline" onClick={fetchBooks}>
            Try again
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                    column.field === "actions" ? "text-right" : ""
                  }`}
                  onClick={() =>
                    column.field !== "actions" && handleSort(column.field)
                  }
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortField === column.field && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.yearPublished}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.copies}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.available}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No books found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredBooks.length > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstBook + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastBook, filteredBooks.length)}
                </span>{" "}
                of <span className="font-medium">{filteredBooks.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNumber;

                  // Always show 5 page numbers centered around current page when possible
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding/Editing Books */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm  transition-opacity"
            onClick={handleCloseModal}
          ></div>
          <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {isEditing ? "Edit Book" : "Add New Book"}
                    </h3>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={currentBook.title}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Author
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={currentBook.author}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          ISBN
                        </label>
                        <input
                          type="text"
                          name="isbn"
                          value={currentBook.isbn}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          name="category"
                          value={currentBook.category}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="1">Fiction</option>
                          <option value="2">Non-fiction</option>
                          <option value="3">Textbooks</option>
                          <option value="4">Science</option>
                          <option value="5">Reference</option>
                          <option value="6">Art and Design</option>
                          <option value="7">Computer Science</option>
                          <option value="8">Engineering</option>
                          <option value="9">Biographies</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Year Published
                        </label>
                        <input
                          type="number"
                          name="yearPublished"
                          value={currentBook.yearPublished}
                          onChange={handleInputChange}
                          min="1000"
                          max={new Date().getFullYear()}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Campus
                        </label>
                        <select
                          name="campus"
                          value={currentBook.campus}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Campus</option>
                          <option value="1">San Bartolome</option>
                          <option value="2">Batasan Hills</option>
                          <option value="3">San Francisco</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Add Book"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
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
