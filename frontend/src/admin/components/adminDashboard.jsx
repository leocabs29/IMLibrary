import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import ViewBorrowedBooks from "./ViewBorrowedBooks";
import ManageUsers from "./ManageUsers";
import BookReservationManagement from "./BookReservationManagement";
import ManageBooks from "./ManageBooks";
import { toast } from "react-toastify"; // For better notifications
function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [error, setError] = useState(null);
  const [totalBooks , setTotalBooks] = useState()
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [borrowedBooks , setBorrowedBooks ] = useState()
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingBorrowedBooks, setLoadingBorrowedBooks] = useState(false);
  const [userCount, setUserCount] = useState()
  const menuItems = [
    "Dashboard",
    "View Borrowed",
    "Manage Books",
    "Manage Users",
    "Book Reservation Management"
  ];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/books/");
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      const data = await response.json();
      const totalBooks = data.length;
      setTotalBooks(totalBooks);
      setError(null);
      console.log("Total Books:", totalBooks);
    } catch (err) {
      setError(`Error fetching books: ${err.message}`);
      toast.error(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBorrowedBooksCount = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/books/count-borrowed-books");
      if (!response.ok) {
        throw new Error(`Failed to fetch borrowed books count: ${response.status}`);
      }
      const data = await response.json();
      const borrowedBooksCount = data.borrowedBooksCount;
      setBorrowedBooks(borrowedBooksCount);
      setError(null);
      console.log("Total Borrowed Books:", borrowedBooksCount);
    } catch (err) {
      setError(`Error fetching borrowed books count: ${err.message}`);
      toast.error(`Failed to load borrowed books count: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchUsersCount = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/count-users");
      if (!response.ok) {
        throw new Error(`Failed to fetch users count: ${response.status}`);
      }
      const data = await response.json();
      const usersCount = data.usersCount;
      setUserCount(usersCount);
      setError(null);
      console.log("Total users count:", usersCount);
    } catch (err) {
      setError(`Error fetching borrowed books count: ${err.message}`);
      toast.error(`Failed to load borrowed books count: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooksCount();
    fetchUsersCount()
  }, []);
  
    useEffect(() => {
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
          console.log(transformedData);
          setError(null);
        } catch (err) {
          setError(`Error fetching user: ${err.message}`);
          toast.error(`Failed to load user: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserById();
    }, []);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white shadow-lg relative">
        <div className="p-4 flex items-center space-x-3 border-b border-slate-700">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <h1 className="text-xl font-semibold">Library Admin</h1>
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
        <div className="absolute bottom-0 p-4 w-64 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              A
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
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeMenu === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Total Books </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded">Today</span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-4">{totalBooks}</p>
                <div className="flex items-center mt-4 text-sm text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  <span>12% increase</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Borrowed Books</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded">Today</span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-4">{borrowedBooks}</p>
                <div className="flex items-center mt-4 text-sm text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  <span>3% decrease</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-700">Active Users</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded">Today</span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-4">{userCount}</p>
                <div className="flex items-center mt-4 text-sm text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  <span>8% increase</span>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "View Borrowed" && <ViewBorrowedBooks />}
          {activeMenu === "Manage Users" && <ManageUsers />}
          {activeMenu === "Manage Books" && (
            <ManageBooks 
            />
          )}
          {activeMenu === "Book Reservation Management" && <BookReservationManagement />}

          {/* Fallback content for unknown menus */}
          {![...menuItems].includes(activeMenu) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{activeMenu} Content</h2>
              <p className="text-gray-600">This is the {activeMenu.toLowerCase()} section of your admin panel.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
