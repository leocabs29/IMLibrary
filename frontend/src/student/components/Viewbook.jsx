import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function ViewBookPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 cursor-pointer"
          onClick={() => navigate('/landing')}
        />
        <div className="flex gap-4 items-center">
          <button className="text-2xl">🛒</button>
          <AccountCircleIcon
            src="/user.png"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
          />
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-100 p-6">
        <h2 className="text-center text-xl font-bold mb-4">What are you looking for?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search for books, articles, database and more"
            className="p-2 border rounded-md w-full md:w-96"
          />
          <select className="p-2 border rounded-md">
            <option>Title</option>
            <option>Genre</option>
            <option>Author</option>
          </select>
          <select className="p-2 border rounded-md">
            <option>Campus</option>
          </select>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </div>

      {/* Book Details */}
      <main className="p-6">
        <h3 className="text-lg font-semibold">
          The Padayon Series: Disciplines and Ideas in the Social Sciences
        </h3>
        <p className="mt-1 text-sm text-gray-700">
          By Dela Cruz, Arleigh Ross D.; Fadrigon, Cecile C. [Author]; Mendoza, Diana J. [Author];
          Mecate, Ronaldo B. [Project Director]
        </p>
        <p className="text-sm text-gray-600 mb-4">Material Type: Text / Print | Literary Form: Not fiction</p>

        <div className="text-sm space-y-2">
          <p><strong>Description:</strong> 225 pages : illustrations, 25 cm</p>
          <p><strong>ISBN:</strong> 9786218064623</p>
          <p><strong>Subject:</strong> Social sciences — study and teaching</p>
          <p><strong>DDC classification:</strong> 300 D32c 2018</p>
          <p className="text-justify">
            Summary: In compliance with the K to 12 Basic Education Curriculum, the Senior High School Academic Track developed the Disciplines and Ideas into the Social Sciences course (DIISS) for students. It serves as one of the required subjects in the Humanities and Social Sciences (HUMSS) Track.
          </p>
        </div>

        {/* Book Item Table */}
        <div className="mt-6 border rounded-md overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-200 text-sm font-semibold p-2">
            <div>Item Type</div>
            <div>Current Location</div>
            <div>Call Number</div>
            <div>Status</div>
            <div>Due Date</div>
            <div>Barcode</div>
          </div>
          <div className="grid grid-cols-6 border-t text-sm p-2">
            <div>Book</div>
            <div>Main Library</div>
            <div>300 D32c 2018</div>
            <div>Available</div>
            <div>—</div>
            <div>07894756</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Reserve</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add to shelf</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4 text-sm mt-4">
        Quezon City University <br />
        673 Quirino Highway Brgy. San Bartolome, Novaliches, Quezon City, Metro Manila
      </footer>
    </div>
  );
}
