import React, { useState } from "react";

function BookReservationManagement() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      bookId: "BK-1023",
      userId: 1,
      userName: "John Smith",
      reservationDate: "2025-04-10",
      dueDate: "2025-04-24",
      status: "active",
    },
    {
      id: 2,
      bookTitle: "To Kill a Mockingbird",
      bookId: "BK-2134",
      userId: 3,
      userName: "Michael Brown",
      reservationDate: "2025-03-25",
      dueDate: "2025-04-08",
      status: "overdue",
    },
    {
      id: 3,
      bookTitle: "1984",
      bookId: "BK-3201",
      userId: 2,
      userName: "Sarah Johnson",
      reservationDate: "2025-04-15",
      dueDate: "2025-04-29",
      status: "active",
    },
    {
      id: 4,
      bookTitle: "Pride and Prejudice",
      bookId: "BK-4056",
      userId: 5,
      userName: "David Wilson",
      reservationDate: "2025-04-02",
      dueDate: "2025-04-16",
      status: "returned",
    },
    {
      id: 5,
      bookTitle: "The Hobbit",
      bookId: "BK-5103",
      userId: 4,
      userName: "Emily Davis",
      reservationDate: "2025-04-05",
      dueDate: "2025-04-19",
      status: "active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState({
    id: 0,
    bookTitle: "",
    bookId: "",
    userId: 0,
    userName: "",
    reservationDate: "",
    dueDate: "",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Available users and books for dropdown selects
  const availableUsers = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "David Wilson" },
  ];

  const availableBooks = [
    { id: "BK-1023", title: "The Great Gatsby" },
    { id: "BK-2134", title: "To Kill a Mockingbird" },
    { id: "BK-3201", title: "1984" },
    { id: "BK-4056", title: "Pride and Prejudice" },
    { id: "BK-5103", title: "The Hobbit" },
    { id: "BK-6074", title: "The Catcher in the Rye" },
    { id: "BK-7015", title: "Lord of the Flies" },
    { id: "BK-8092", title: "Brave New World" },
  ];

  const handleOpenModal = (reservation = null) => {
    if (reservation) {
      setCurrentReservation(reservation);
      setIsEditing(true);
    } else {
      const today = new Date().toISOString().split("T")[0];
      // Set due date to 14 days from today
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const formattedDueDate = dueDate.toISOString().split("T")[0];

      setCurrentReservation({
        id: reservations.length + 1,
        bookTitle: "",
        bookId: "",
        userId: 0,
        userName: "",
        reservationDate: today,
        dueDate: formattedDueDate,
        status: "active",
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
    setCurrentReservation({
      ...currentReservation,
      [name]: value,
    });

    // Special handling for book and user selection
    if (name === "bookId") {
      const selectedBook = availableBooks.find((book) => book.id === value);
      if (selectedBook) {
        setCurrentReservation((prev) => ({
          ...prev,
          bookId: value,
          bookTitle: selectedBook.title,
        }));
      }
    } else if (name === "userId") {
      const selectedUser = availableUsers.find(
        (user) => user.id === parseInt(value)
      );
      if (selectedUser) {
        setCurrentReservation((prev) => ({
          ...prev,
          userId: parseInt(value),
          userName: selectedUser.name,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setReservations(
        reservations.map((res) =>
          res.id === currentReservation.id ? currentReservation : res
        )
      );
    } else {
      setReservations([...reservations, currentReservation]);
    }

    handleCloseModal();
  };

  const handleUpdateStatus = (id, newStatus) => {
    setReservations(
      reservations.map((res) => {
        if (res.id === id) {
          return {
            ...res,
            status: newStatus,
          };
        }
        return res;
      })
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setReservations(reservations.filter((res) => res.id !== id));
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReservations = reservations.filter((res) => {
    const matchesSearch =
      res.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.bookId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || res.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate days remaining or overdue
  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else {
      return `${diffDays} days remaining`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
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
            <select
              className="pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                          {reservation.bookTitle.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.bookTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {reservation.bookId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.userName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {reservation.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {reservation.reservationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.dueDate}
                    </div>
                    {reservation.status !== "returned" &&
                      reservation.status !== "cancelled" && (
                        <div
                          className={`text-xs ${
                            new Date(reservation.dueDate) < new Date()
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {calculateDaysRemaining(reservation.dueDate)}
                        </div>
                      )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClassName(
                        reservation.status
                      )}`}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {reservation.status === "active" && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateStatus(reservation.id, "returned")
                          }
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Return
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(reservation.id, "cancelled")
                          }
                          className="text-gray-600 hover:text-gray-900 mr-3"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reservation.status === "overdue" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(reservation.id, "returned")
                        }
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Return
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenModal(reservation)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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
