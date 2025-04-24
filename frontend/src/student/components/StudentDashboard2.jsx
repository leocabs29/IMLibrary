import React, { useState } from "react";
import logo from "../../assets/logo.png";

function StudentDashboard2() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeCampus, setActiveCampus] = useState("Main");
  
  // Menu items for student dashboard
  const menuItems = [
    "Dashboard",
    "My Books",
    "Browse Catalog",
    "Reservations",
    "Library Map",
    "Help & FAQs"
  ];

  // Campus options
  const campuses = ["Main", "Batasan", "San Francisco"];

  // Mock book data
  const borrowedBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", dueDate: "2025-05-10", campus: "Main" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", dueDate: "2025-05-15", campus: "Batasan" },
    { id: 3, title: "1984", author: "George Orwell", dueDate: "2025-05-05", campus: "San Francisco" }
  ];

  // Filter books by active campus
  const campusBooks = borrowedBooks.filter(book => 
    activeCampus === "All Campuses" ? true : book.campus === activeCampus
  );

  // Mock events data by campus
  const campusEvents = {
    "Main": [
      { id: 1, title: "Book Club Meeting", date: "May 5, 2025", time: "3:00 PM" },
      { id: 2, title: "Research Workshop", date: "May 10, 2025", time: "2:00 PM" }
    ],
    "Batasan": [
      { id: 1, title: "Poetry Reading", date: "May 7, 2025", time: "4:00 PM" },
      { id: 2, title: "Finals Study Group", date: "May 12, 2025", time: "6:00 PM" }
    ],
    "San Francisco": [
      { id: 1, title: "Author Visit: J.K. Smith", date: "May 6, 2025", time: "5:00 PM" },
      { id: 2, title: "Tech Skills Workshop", date: "May 9, 2025", time: "1:00 PM" }
    ]
  };

  // Mock campus-specific announcements
  const announcements = {
    "Main": "Extended hours during finals week: open until midnight from May 15-22.",
    "Batasan": "New study rooms available for reservation on the 2nd floor.",
    "San Francisco": "Library will be closed on May 8 for system maintenance."
  };

  // Mock popular books for each campus
  const popularBooks = {
    "Main": ["Atomic Habits", "The Psychology of Money", "Principles of Economics"],
    "Batasan": ["How to Win Friends & Influence People", "Digital Marketing Fundamentals", "Biology Today"],
    "San Francisco": ["Python Programming", "Computer Networks", "Introduction to AI"]
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white shadow-lg relative">
        <div className="p-4 flex items-center space-x-3 border-b border-slate-700">
          <img src={logo} className="w-10 h-10" alt="Logo" />
          <h1 className="text-xl font-semibold">Library Portal</h1>
        </div>

        {/* Campus Selector */}
        <div className="mt-6 px-3">
          <p className="text-sm text-slate-400 mb-2 px-4">Select Campus</p>
          <div className="flex flex-col space-y-2 mb-6">
            {campuses.map((campus) => (
              <button
                key={campus}
                onClick={() => setActiveCampus(campus)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCampus === campus
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {campus} Campus
              </button>
            ))}
          </div>
        </div>

        <nav className="mt-2 px-3">
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
              <p className="text-sm font-medium">Student User</p>
              <p className="text-xs text-slate-400">student@university.edu</p>
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
              {activeCampus} Campus - {activeMenu}
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
                  placeholder="Search books..."
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
            <div className="space-y-6">
              {/* Campus Announcement */}
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
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
                  <h3 className="text-lg font-medium text-gray-700">Books Borrowed</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-4">3</p>
                  <p className="text-sm text-gray-500 mt-2">2 books due this week</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-700">Reservations</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-4">1</p>
                  <p className="text-sm text-gray-500 mt-2">Ready for pickup</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-700">Study Room Hours</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-4">8</p>
                  <p className="text-sm text-gray-500 mt-2">Reserved this month</p>
                </div>
              </div>

              {/* Campus Events */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800">Upcoming Events at {activeCampus} Campus</h2>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {campusEvents[activeCampus].map(event => (
                      <li key={event.id} className="py-4 flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                        </div>
                        <button className="px-3 py-1 text-xs text-blue-600 font-medium rounded-full border border-blue-600 hover:bg-blue-50">
                          RSVP
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Popular Books */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800">Popular at {activeCampus} Campus</h2>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {popularBooks[activeCampus].map((book, index) => (
                      <li key={index} className="py-4 flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{book}</p>
                        <button className="px-3 py-1 text-xs text-blue-600 font-medium rounded-full border border-blue-600 hover:bg-blue-50">
                          Reserve
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
                <h2 className="text-lg font-medium">My Borrowed Books</h2>
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
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campus
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campusBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.campus}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Renew</button>
                          <button className="text-blue-600 hover:text-blue-900">Return</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === "Browse Catalog" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Browse Catalog</h2>
              <p className="text-gray-600 mb-6">Search and browse books available at {activeCampus} Campus.</p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </span>
                    <input
                      type="search"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search by title, author, subject..."
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <select className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Categories</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="textbooks">Textbooks</option>
                    <option value="reference">Reference</option>
                  </select>
                </div>
              </div>
              
              {/* Sample catalog results */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 italic">Search or select a category to browse available books.</p>
              </div>
            </div>
          )}

          {activeMenu === "Reservations" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Book Reservations</h2>
              <p className="text-gray-600 mb-6">Manage your book reservations at {activeCampus} Campus.</p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      You have 1 book ready for pickup at {activeCampus} Campus. Please collect it by May 1, 2025.
                    </p>
                  </div>
                </div>
              </div>
              
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
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Introduction to Data Science
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ready for pickup
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activeCampus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        April 28, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Cancel</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === "Library Map" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{activeCampus} Campus Map</h2>
              <p className="text-gray-600 mb-6">Navigate the {activeCampus} Campus library facility.</p>
              
              <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Interactive map of {activeCampus} Campus library would display here</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Library Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Weekdays</h4>
                    <p className="text-gray-600">7:00 AM - 10:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Weekends</h4>
                    <p className="text-gray-600">9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Help & FAQs" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Frequently Asked Questions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How many books can I borrow at once?</h3>
                    <p className="mt-2 text-sm text-gray-500">Students can borrow up to 10 books at a time across all campuses.</p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Can I return books to any campus?</h3>
                    <p className="mt-2 text-sm text-gray-500">Yes, books can be returned to any campus library regardless of where they were borrowed from.</p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How do I reserve a study room?</h3>
                    <p className="mt-2 text-sm text-gray-500">Study rooms can be reserved through the Library Portal. Navigate to the "Reservations" section and select "Study Room Reservation".</p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">What are the late fees?</h3>
                    <p className="mt-2 text-sm text-gray-500">Late fees are $0.25 per day per book, with a maximum of $10 per book.</p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">How do I request an interlibrary loan?</h3>
                    <p className="mt-2 text-sm text-gray-500">Interlibrary loans can be requested through the "Browse Catalog" section. Search for the book you need and select "Request ILL" if it's not available at any of our campuses.</p>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800">Need more help?</h3>
                  <p className="mt-2 text-blue-700">Contact the {activeCampus} Campus library staff:</p>
                  <p className="mt-1 text-blue-700">Email: {activeCampus.toLowerCase()}-library@university.edu</p>
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