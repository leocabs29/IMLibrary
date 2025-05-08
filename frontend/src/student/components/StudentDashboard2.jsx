import logo from "../../assets/logo.png";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // For better notifications
function StudentDashboard2() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeCampus, setActiveCampus] = useState("Main");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [bookCount, setBookCount] = useState();
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  // Add these state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("All Campuses");

  // Derived values
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginatedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(getFilteredBooks().length / booksPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleBooksPerPageChange = (newBooksPerPage) => {
    setBooksPerPage(newBooksPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Helper function to determine which page numbers to show
  const getPageNumbersToShow = (current, total) => {
    if (total <= 5) {
      // If we have 5 or fewer pages, show all
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Handle cases where we're near the beginning
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }

    // Handle cases where we're near the end
    if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    }

    // Otherwise show current page and 2 pages on each side
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  // Add getPageNumbers function
  const getPageNumbers = () => {
    const totalPages = Math.ceil(getFilteredBooks().length / booksPerPage);
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const columns = [
    { field: "title", label: "Title" },
    { field: "author", label: "Author" },
    { field: "isbn", label: "ISBN" },
    { field: "category", label: "Category" },
    { field: "yearPublished", label: "Year" },
    { field: "campus", label: "Campus" },
    { field: "available", label: "Available" },
    { field: "actions", label: "Actions" },
  ];
  const fetchUserById = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("user_id"); // get the user_id from localStorage
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const user = await response.json(); // because we are fetching only ONE user now, not a list

      // Transform the single user data
      const transformedData = {
        id: user[0],
        name: user[1],
        email: user[2],
        role: user[3],
        status: user[4],
        joinDate: user[5],
      };

      setUsers([transformedData]); // put inside an array because setUsers expects an array
      setError(null);
    } catch (err) {
      setError(`Error fetching user: ${err.message}`);
      toast.error(`Failed to load user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooksCount = async () => {
    setLoading(true);
    try {
      // Get the user_id from localStorage or wherever it's stored
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      // Dynamically insert the user_id into the URL
      const response = await fetch(
        `http://localhost:3000/books/count-borrowed-books/${userId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch borrowed books count: ${response.status}`
        );
      }

      const data = await response.json();
      const borrowedBooksCount = data.borrowedBooksCount;
      setBookCount(borrowedBooksCount);
      setError(null);
    } catch (err) {
      setError(`Error fetching borrowed books count: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      // Get the user_id from localStorage
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        throw new Error("User ID is not available in localStorage");
      }

      const response = await fetch(
        `http://localhost:3000/books/borrowed-books/${userId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch borrowed books: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        setError(data.message);
      } else {
        setBorrowedBooks(data); // Assuming the response contains the borrowed books in an array
      }

      setError(null);
    } catch (err) {
      setError(`Error fetching borrowed books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books/");
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching books: ${err.message}`);
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:3000/books/reservations"); // Adjust URL as needed
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.status}`);
      }
      const data = await response.json();
      setReservations(data.reservations); // Update the state with the array of reservations
      console.log("Reservation ID:", JSON.stringify(data.reservations));
      setLoading(false);
    } catch (err) {
      setError(`Error fetching reservations: ${err.message}`);
      setLoading(false);
    }
  };

  const handleBorrowBook = async (book) => {
    const bookId = book[0];
    const userId = localStorage.getItem("user_id");

    try {
      const response = await fetch(
        `http://localhost:3000/books/borrowed_book/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the local state to reflect the change
        setBooks(prevBooks =>
          prevBooks.map(b =>
            b[0] === bookId
              ? [...b.slice(0, 6), (parseInt(b[6] || 0) - 1).toString(), "borrowed", ...b.slice(8)]
              : b
          )
        );
        toast.success(data.message || "Book borrow request submitted successfully.");
        // Refresh the borrowed books and book count
        fetchBorrowedBooks();
        fetchBorrowedBooksCount();
      } else {
        toast.error(data.error || "Failed to submit borrow request.");
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("Failed to borrow the book.");
    }
  };

  const handleCancelReservation = async (bookId, borrowedId) => {
    try {
      setLoading(true);
      console.log("Attempting to cancel reservation:", { bookId, borrowedId });
  
      const response = await fetch("http://localhost:3000/books/cancel", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: Number(bookId),
          borrowedId: Number(borrowedId)
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || "Failed to cancel reservation");
      }
  
      // Refresh the reservations list after successful cancellation
      const updatedReservations = await fetchReservations();
      setReservations(updatedReservations.filter(res => 
        !(res[3] === bookId && res[4] === borrowedId)
      ));
  
      toast.success(result.message || "Reservation cancelled successfully!");
      
    } catch (error) {
    
    } finally {
      setLoading(false);
    }
  };

  // Update campuses array
  const campuses = ["San Bartolome", "Batasan Hills", "San Francisco"];

  // Update getFilteredBooks function to handle pagination properly
  const getFilteredBooks = () => {
    return books.filter((book) => {
      const matchesSearch = 
        book[1]?.toLowerCase().includes(searchQuery.toLowerCase()) || // title
        book[2]?.toLowerCase().includes(searchQuery.toLowerCase()) || // author
        book[3]?.toLowerCase().includes(searchQuery.toLowerCase());   // category
      
      const matchesCategory = !selectedCategory || book[3] === selectedCategory;
      const matchesCampus = selectedCampus === "All Campuses" || book[8] === selectedCampus;

      return matchesSearch && matchesCategory && matchesCampus;
    });
  };

  // Add function to check if book is available
  const isBookAvailable = (book) => {
    const availableCopies = parseInt(book[6] || 0);
    return availableCopies > 0 && book[7] !== "borrowed";
  };

  // Add function to get random books
  const getRandomBooks = () => {
    const availableBooks = books.filter(book => isBookAvailable(book));
    const shuffled = [...availableBooks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Fix the borrowed books count to only count "borrowed" status
  const getMyBooksCount = () => {
    return borrowedBooks.filter(book => book[2] === "borrowed").length;
  };

  // Get filtered borrowed books (excluding pending status)
  const getFilteredBorrowedBooks = () => {
    return borrowedBooks.filter(book => book[2] !== "available");
  };

  // Add functions to count different book statuses
  const getReadyToClaimCount = () => {
    return borrowedBooks.filter(book => book[2] === "ready_to_claim").length;
  };

  const getPendingBooksCount = () => {
    return borrowedBooks.filter(book => book[2] === "available").length;
  };

  useEffect(() => {
    fetchUserById();
    fetchBorrowedBooksCount();
    fetchBorrowedBooks();
    fetchBooks();
    fetchReservations();
  }, []);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedCampus]);

  // Menu items for student dashboard
  const menuItems = [
    "Dashboard",
    "My Books",
    "Browse Catalog",
    "Reservations",
    "Help & FAQs",
  ];

  // Mock events data by campus
  const campusEvents = {
    Main: [
      {
        id: 1,
        title: "Book Club Meeting",
        date: "May 5, 2025",
        time: "3:00 PM",
      },
      {
        id: 2,
        title: "Research Workshop",
        date: "May 10, 2025",
        time: "2:00 PM",
      },
    ],
    Batasan: [
      { id: 1, title: "Poetry Reading", date: "May 7, 2025", time: "4:00 PM" },
      {
        id: 2,
        title: "Finals Study Group",
        date: "May 12, 2025",
        time: "6:00 PM",
      },
    ],
    "San Francisco": [
      {
        id: 1,
        title: "Author Visit: J.K. Smith",
        date: "May 6, 2025",
        time: "5:00 PM",
      },
      {
        id: 2,
        title: "Tech Skills Workshop",
        date: "May 9, 2025",
        time: "1:00 PM",
      },
    ],
  };

  // Mock campus-specific announcements
  const announcements = {
    Main: "Extended hours during finals week: open until midnight from May 15-22.",
    Batasan: "New study rooms available for reservation on the 2nd floor.",
    "San Francisco": "Library will be closed on May 8 for system maintenance.",
  };

  // Mock popular books for each campus
  const popularBooks = {
    Main: [
      "Atomic Habits",
      "The Psychology of Money",
      "Principles of Economics",
    ],
    Batasan: [
      "How to Win Friends & Influence People",
      "Digital Marketing Fundamentals",
      "Biology Today",
    ],
    "San Francisco": [
      "Python Programming",
      "Computer Networks",
      "Introduction to AI",
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white shadow-lg relative">
        <div className="p-4 flex items-center space-x-3 border-b border-slate-700">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <h1 className="text-xl font-semibold">Library Portal</h1>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg cursor-pointer transition-all ${
                activeMenu === item
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              <span>{item}</span>
            </div>
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className="absolute bottom-0 p-4 w-full border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <p className="text-sm font-medium">{users[0]?.name}</p>
              <p className="text-xs text-slate-400">{users[0]?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeMenu}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeMenu === "Dashboard" && (
            <div className="space-y-6">
              {/* Campus Announcement */}
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm leading-5 font-medium">
                      {announcements[activeCampus]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-700">
                    Books Borrowed
                  </h3>
                  <p className="text-3xl font-bold text-gray-800 mt-4">
                    {getMyBooksCount()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Currently borrowed books
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-700">
                    Ready to Pick Up
                  </h3>
                  <p className="text-3xl font-bold text-green-600 mt-4">
                    {borrowedBooks.filter(book => book[2] === "ready_to_claim").length}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Books ready for collection
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-700">
                    In Process
                  </h3>
                  <p className="text-3xl font-bold text-yellow-600 mt-4">
                    {borrowedBooks.filter(book => book[2] === "available").length}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Pending book requests
                  </p>
                </div>
              </div>

              {/* Campus Events */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Upcoming Events at {activeCampus} Campus
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {campusEvents[activeCampus].map((event) => (
                      <li key={event.id} className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Available Books */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Available Books You Might Like
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {getRandomBooks().map((book) => (
                      <li key={book[0]} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {book[1]}
                          </p>
                          <p className="text-sm text-gray-500">
                            By {book[2]} • {book[8]} Campus
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {book[6]} copies available
                          </p>
                        </div>
                        <button
                          onClick={() => handleBorrowBook(book)}
                          className="px-3 py-1 text-xs text-blue-600 font-medium rounded-full border border-blue-600 hover:bg-blue-50"
                          disabled={!isBookAvailable(book) || loading}
                        >
                          Borrow
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "My Books" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">My Books</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredBorrowedBooks().length > 0 ? (
                      getFilteredBorrowedBooks().map((book) => (
                        <tr key={book[0]}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {book[1]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {book[3]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              book[2] === "ready_to_claim"
                                ? "bg-green-100 text-green-800"
                                : book[2] === "borrowed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {book[2] === "ready_to_claim"
                                ? "Ready to Claim"
                                : book[2] === "borrowed"
                                ? "Borrowed"
                                : book[2]}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {book[8]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {book[2] === "borrowed" ? book[6] : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No books found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === "Browse Catalog" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Browse Catalog</h2>
              <p className="text-gray-600 mb-6">
                Search and browse books available in our library system.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="search"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search by title, author, subject..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <select 
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-Fiction</option>
                    <option value="Textbooks">Textbooks</option>
                    <option value="Reference">Reference</option>
                  </select>
                </div>
                <div className="w-full md:w-48">
                  <select
                    className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                  >
                    <option value="All Campuses">All Campuses</option>
                    {campuses.map((campus) => (
                      <option key={campus} value={campus}>
                        {campus} Campus
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
                            column.field !== "actions" &&
                            handleSort(column.field)
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
                        <td
                          colSpan={columns.length}
                          className="px-6 py-4 text-center"
                        >
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                          </div>
                        </td>
                      </tr>
                    ) : getFilteredBooks().length > 0 ? (
                      getFilteredBooks()
                        .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
                        .map((book) => (
                          <tr key={book[0]} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[1]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[2]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[4]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[3]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[5]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {book[8]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isBookAvailable(book)
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {isBookAvailable(book) 
                                  ? `Available (${book[6]} copies)` 
                                  : "Unavailable"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button
                                onClick={() => handleBorrowBook(book)}
                                className={`text-blue-600 hover:text-blue-900 mr-3 ${
                                  !isBookAvailable(book) ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={!isBookAvailable(book) || loading}
                              >
                                {isBookAvailable(book) ? "Borrow" : "Unavailable"}
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

                {/* Pagination */}
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
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
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === Math.ceil(getFilteredBooks().length / booksPerPage)}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === Math.ceil(getFilteredBooks().length / booksPerPage)
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
                        <span className="font-medium">
                          {getFilteredBooks().length > 0
                            ? (currentPage - 1) * booksPerPage + 1
                            : 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(currentPage * booksPerPage, getFilteredBooks().length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">{getFilteredBooks().length}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {getPageNumbers().map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Reservations" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Book Reservations</h2>
              <p className="text-gray-600 mb-6">
                Manage your book reservations across all campuses.
              </p>

              {reservations.some(reservation => reservation[1] === "ready_to_claim") && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        You have books ready for pickup. Please collect them within 3 days of notification.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations && reservations.length > 0 ? (
                      reservations
                        .filter((reservation) => reservation[1] !== "borrowed")
                        .map((reservation) => {
                          const [title, status, campus, bookId, borrowedId] = reservation;
                          return (
                            <tr key={borrowedId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    status === "available"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : status === "ready_to_claim"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {status === "available"
                                    ? "Pending Processing"
                                    : status === "ready_to_claim"
                                    ? "Ready to Claim"
                                    : status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {campus}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date().toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleCancelReservation(bookId, borrowedId)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No reservations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === "Help & FAQs" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      How many books can I borrow at once?
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Students can borrow up to 10 books at a time across all
                      campuses.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      Can I return books to any campus?
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Yes, books can be returned to any campus library
                      regardless of where they were borrowed from.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      How do I reserve a study room?
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Study rooms can be reserved through the Library Portal.
                      Navigate to the "Reservations" section and select "Study
                      Room Reservation".
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      What are the late fees?
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Late fees are $0.25 per day per book, with a maximum of
                      $10 per book.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      How do I request an interlibrary loan?
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Interlibrary loans can be requested through the "Browse
                      Catalog" section. Search for the book you need and select
                      "Request ILL" if it's not available at any of our
                      campuses.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800">
                    Need more help?
                  </h3>
                  <p className="mt-2 text-blue-700">
                    Contact the library staff:
                  </p>
                  <p className="mt-1 text-blue-700">
                    Email: library@university.edu
                  </p>
                  <p className="text-blue-700">Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard2;