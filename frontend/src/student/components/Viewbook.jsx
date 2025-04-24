import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Note: Since we can't use MUI components directly, I'll recreate similar functionality
// You'll need to replace the placeholder icons with your actual imports later
export default function ViewBookPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('Title');
  const [campus, setCampus] = useState('All Campuses');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <img
            src="/api/placeholder/60/60" // Replace with actual logo path
            alt="QCU Logo"
            className="w-12 h-12 cursor-pointer rounded-full"
            onClick={() => navigate('/landing')}
          />
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">QCU Library System</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <button className="relative bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="hidden md:block text-gray-700">Student Name</span>
          </div>
        </div>
      </header>

      {/* Back navigation */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Search Results
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-blue-50 p-6 border-y border-blue-100">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-4 text-gray-800">What are you looking for?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for books, articles, database and more"
              className="p-3 border border-gray-300 rounded-md w-full md:w-96 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select 
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option>Title</option>
              <option>Genre</option>
              <option>Author</option>
              <option>ISBN</option>
            </select>
            <select 
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
            >
              <option>All Campuses</option>
              <option>Main Campus</option>
              <option>San Bartolome</option>
              <option>San Francisco</option>
            </select>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition shadow-sm font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <main className="container mx-auto p-6 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="md:flex gap-6">
            {/* Book Cover */}
            <div className="md:w-1/4 mb-6 md:mb-0">
              <div className="bg-gray-200 rounded-md aspect-[3/4] flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Reserve
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Add to shelf
                </button>
              </div>
            </div>
            
            {/* Book Information */}
            <div className="md:w-3/4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                The Padayon Series: Disciplines and Ideas in the Social Sciences
              </h1>
              <p className="text-gray-700 mb-4">
                By <span className="font-medium">Dela Cruz, Arleigh Ross D.; Fadrigon, Cecile C.; Mendoza, Diana J.</span>
                <br />
                <span className="text-sm">Project Director: Mecate, Ronaldo B.</span>
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Social Sciences</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Academic</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">K-12</span>
              </div>
              
              <div className="border-t border-gray-200 py-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Material Type</p>
                    <p className="font-medium">Text / Print</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Literary Form</p>
                    <p className="font-medium">Not fiction</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ISBN</p>
                    <p className="font-medium">9786218064623</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">DDC classification</p>
                    <p className="font-medium">300 D32c 2018</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Subject</p>
                    <p className="font-medium">Social sciences — study and teaching</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Physical Description</p>
                    <p className="font-medium">225 pages : illustrations, 25 cm</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-500 text-sm mb-2">Summary</p>
                  <p className="text-gray-800">
                    In compliance with the K to 12 Basic Education Curriculum, the Senior High School Academic Track developed the Disciplines and Ideas into the Social Sciences course (DIISS) for students. It serves as one of the required subjects in the Humanities and Social Sciences (HUMSS) Track.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Item Table */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Availability</h2>
            <div className="border rounded-md overflow-hidden shadow-sm">
              <div className="grid grid-cols-6 bg-gray-100 text-sm font-semibold p-3 border-b">
                <div>Item Type</div>
                <div>Current Location</div>
                <div>Call Number</div>
                <div>Status</div>
                <div>Due Date</div>
                <div>Barcode</div>
              </div>
              <div className="grid grid-cols-6 text-sm p-3 hover:bg-gray-50">
                <div>Book</div>
                <div>Main Library</div>
                <div>300 D32c 2018</div>
                <div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Available</span>
                </div>
                <div>—</div>
                <div>07894756</div>
              </div>
              <div className="grid grid-cols-6 text-sm p-3 border-t hover:bg-gray-50">
                <div>Book</div>
                <div>San Francisco Branch</div>
                <div>300 D32c 2018</div>
                <div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">On Loan</span>
                </div>
                <div>May 15, 2025</div>
                <div>07894757</div>
              </div>
            </div>
          </div>
          
          {/* Related Books */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-md overflow-hidden hover:shadow-md transition cursor-pointer">
                  <div className="bg-gray-200 aspect-[3/4]"></div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">Related Book Title {i}</h3>
                    <p className="text-xs text-gray-500">Author {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <div className="md:flex justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-lg mb-2">Quezon City University</h3>
              <p className="text-gray-300">
                673 Quirino Highway<br />
                Brgy. San Bartolome, Novaliches<br />
                Quezon City, Metro Manila
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Library Hours</h3>
              <p className="text-gray-300">
                Monday - Friday: 8:00 AM - 5:00 PM<br />
                Saturday: 8:00 AM - 12:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Contact Us</h3>
              <p className="text-gray-300">
                Email: library@qcu.edu.ph<br />
                Phone: (02) 8123-4567
              </p>
              <div className="flex gap-4 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 hover:text-white cursor-pointer">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 hover:text-white cursor-pointer">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Quezon City University Library. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}