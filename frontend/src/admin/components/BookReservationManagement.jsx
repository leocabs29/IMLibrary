import React, { useState, useEffect } from "react";

function BookReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type
    });
    setTimeout(() => {
      setToast({
        ...toast,
        visible: false
      });
    }, 3000);
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/books/book-reservation"
      );
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }
      const data = await response.json();
      setReservations(data);
      console.log("Reservations refreshed:", data);
      setError("");
    } catch (err) {
      setError(err.message);
      showToast(`Error refreshing data: ${err.message}`, "error");
      console.error("Error fetching reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleOpenModal = (reservation = null) => {
    if (reservation) {
      setCurrentReservation(reservation);
      setIsEditing(true);
    } else {
      const today = new Date().toISOString().split("T")[0];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const formattedDueDate = dueDate.toISOString().split("T")[0];

      setCurrentReservation({
        id: reservations.length + 1,
        bookTitle: "",
        bookId: "",
        userId: "",
        userName: "",
        reservationDate: today,
        dueDate: formattedDueDate,
        status: "active",
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleAccept = async (userId, bookId) => {
    console.log(
      `Attempting to accept reservation for User ID: ${userId}, Book ID: ${bookId}`
    );

    if (!userId || !bookId) {
      setMessage("Missing user ID or book ID.");
      showToast("Missing user ID or book ID.", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/books/reservations/accept",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            bookId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept reservation");
      }

      const data = await response.json();
      console.log("Reservation accepted:", data);
      setMessage(data.message || "Reservation accepted");
      showToast(data.message || "Reservation accepted successfully");
      
      // Refresh the reservations list after action
      fetchReservations();
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Something went wrong.");
      showToast(error.message || "Something went wrong.", "error");
    }
  };

  
  const handleClaim = async (userId, bookId) => {
    console.log(
      `Attempting to claim reservation for User ID: ${userId}, Book ID: ${bookId}`
    );

    if (!userId || !bookId) {
      setMessage("Missing user ID or book ID.");
      showToast("Missing user ID or book ID.", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/books/reservations/claim",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            bookId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to claim reservation");
      }

      const data = await response.json();
      console.log("Book claimed:", data);
      setMessage(data.message || "Reservation accepted");
      showToast(data.message || "Book claimed successfully");
      
      // Refresh the reservations list after action
      fetchReservations();
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Something went wrong.");
      showToast(error.message || "Something went wrong.", "error");
    }
  };

  const handleReturn = async (userId, bookId) => {
    console.log(
      `Attempting to return book for User ID: ${userId}, Book ID: ${bookId}`
    );

    if (!userId || !bookId) {
      setMessage("Missing user ID or book ID.");
      showToast("Missing user ID or book ID.", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/books/reservations/return",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            bookId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to return book");
      }

      const data = await response.json();
      console.log("Book returned:", data);
      setMessage(data.message || "Book returned successfully");
      showToast(data.message || "Book returned successfully");
      
      // Refresh the reservations list after action
      fetchReservations();
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Something went wrong.");
      showToast(error.message || "Something went wrong.", "error");
    }
  };

  const mappedReservations = reservations.map((res) => ({
    bookTitle: res.title, // Update with actual API response fields
    bookId: res.book_id,
    userId: res.user_id,
    borrowDate: res.borrow_date,
    dueDate: res.due_date,
    status: res.status_name,
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentReservation((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "bookId") {
        const selectedBook = availableBooks.find((book) => book.id === value);
        if (selectedBook) {
          updated.bookTitle = selectedBook.title;
        }
      }

      if (name === "userId") {
        const selectedUser = availableUsers.find(
          (user) => user.id === parseInt(value)
        );
        if (selectedUser) {
          updated.userName = selectedUser.name;
          updated.userId = parseInt(value);
        }
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setReservations((prev) =>
        prev.map((res) =>
          res.id === currentReservation.id ? currentReservation : res
        )
      );
    } else {
      setReservations((prev) => [...prev, currentReservation]); // Ensure new reservation is correctly added
    }

    handleCloseModal();
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setReservations((prev) => prev.filter((res) => res.id !== id));
    }
  };

  const statusClassName = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "borrowed":
        return "bg-blue-100 text-blue-800";
      case "pending_processing":
      case "available":
        return "bg-yellow-100 text-yellow-800";
      case "ready_to_claim":
      case "accepted":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReservations = mappedReservations.filter((res) => {
    const matchesSearch =
      (res.bookTitle?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (res.bookId?.toString().toLowerCase() ?? "").includes(
        searchTerm.toLowerCase()
      );

    const matchesStatus = filterStatus === "all" || res.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    return `${diffDays} days remaining`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {toast.visible && (
        <div 
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 
            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
          }`}
        >
          <div className="flex items-center">
            {toast.type === 'success' && (
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            {toast.type === 'warning' && (
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Book Reservation Management
          </h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search books or users..."
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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
              New Reservation
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Book
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reservation Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation[0]} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                          {reservation[0]}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation[2]}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {reservation[1]}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation[3]}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {reservation[4]}
                    </div>
                  </td>

                  {/* Reservation Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation[8] === "borrowed" ||
                    reservation[8] === "overdue" ||
                    reservation[8] === "returned" ? (
                      <div className="text-sm text-gray-500">
                        {formatDate(reservation[5])}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Not set
                      </div>
                    )}
                  </td>

                  {/* Due Date - Only show if status is borrowed, overdue, or returned */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation[8] === "borrowed" ||
                    reservation[8] === "overdue" ||
                    reservation[8] === "returned" ? (
                      <>
                        <div className="text-sm text-gray-900">
                          {formatDate(reservation[6])}
                        </div>
                        {reservation[8] !== "returned" &&
                          reservation[8] !== "cancelled" && (
                            <div
                              className={`text-xs ${
                                new Date(reservation[6]) < new Date()
                                  ? "text-red-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {calculateDaysRemaining(reservation[6])}
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Not set
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClassName(
                        reservation[8]
                      )}`}
                    >
                      {reservation[8] === "available"
                        ? "requested"
                        : reservation[8]}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {(reservation[8] === "overdue" ||
                      reservation[8] === "borrowed") && (
                      <button
                        onClick={() =>
                          handleReturn(reservation[4], reservation[1])
                        }
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Return
                      </button>
                    )}

                    {(reservation[8] === "pending_processing" ||
                      reservation[8] === "available") && (
                      <button
                        onClick={() =>
                          handleAccept(reservation[4], reservation[1])
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Accept
                      </button>
                    )}

                    {reservation[8] === "ready_to_claim" && (
                      <button
                        onClick={() =>
                          handleClaim(reservation[4], reservation[1])
                        }
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Claim
                      </button>
                    )}
                    {reservation[8] === "accepted" && (
                      <button
                        onClick={() =>
                          handleClaim(reservation[4], reservation[1])
                        }
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Ready to Claim
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No reservations found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing reservations */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            aria-hidden="true"
          ></div>
          <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {isEditing ? "Edit Reservation" : "New Reservation"}{" "}
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="bookId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Book
                    </label>
                    <div className="mt-1">
                      <select
                        id="bookId"
                        name="bookId"
                        required
                        value={currentReservation.bookId}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select a book</option>
                        {availableBooks.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.title} ({book.id}){" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="userId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User
                    </label>
                    <div className="mt-1">
                      <select
                        id="userId"
                        name="userId"
                        required
                        value={currentReservation.userId}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select a user</option>
                        {availableUsers.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} (ID: {user.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="reservationDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Reservation Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="reservationDate"
                        id="reservationDate"
                        required
                        value={currentReservation.reservationDate}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Due Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        required
                        value={currentReservation.dueDate}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <div className="mt-1">
                      <select
                        id="status"
                        name="status"
                        value={currentReservation.status}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="overdue">Overdue</option>
                        <option value="returned">Returned</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isEditing ? "Save Changes" : "Create Reservation"}
                </button>{" "}
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

export default BookReservationManagement;
