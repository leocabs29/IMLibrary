import React, { useState } from "react";
import logo from "../../assets/logo.png";
import ViewBorrowedBooks from "./ViewBorrowedBooks";
import ManageUsers from "./ManageUsers";
import BookReservationManagement from "./BookReservationManagement";
import ManageBooks from "./ManageBooks";

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  

  const menuItems = [
    "Dashboard",
    "View Borrowed",
    "Manage Books",
    "Manage Users",
    "Book Reservation Management"
  ];

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
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-400">admin@library.com</p>
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
                  <h3 className="text-lg font-medium text-gray-700">Total Books</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium p-1 rounded">Today</span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-4">1,254</p>
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
                <p className="text-3xl font-bold text-gray-800 mt-4">325</p>
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
                <p className="text-3xl font-bold text-gray-800 mt-4">86</p>
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
