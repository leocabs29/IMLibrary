import { useState } from 'react';

export default function StudentDASHBOARD() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
        {/* Header with logo and search */}
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <img 
              src="/api/placeholder/60/60" 
              alt="QCU Logo" 
              className="rounded-full"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="bg-gray-200 rounded-full p-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  2
                </span>
              </div>
            </div>
            <img 
              src="/api/placeholder/40/40" 
              alt="User Profile" 
              className="rounded-full"
            />
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-gray-200 p-6 rounded-md mx-6 mb-6">
          <div className="text-center mb-3">
            <h2 className="text-black font-bold">What are you looking for?</h2>
          </div>
          
          <div className="flex mb-4">
            <input 
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for books, articles, database and more"
              className="flex-grow p-1 px-2 border border-gray-300 rounded-l"
            />
            <button className="bg-green-500 text-white px-4 py-1 rounded-r">
              Search
            </button>
          </div>
          
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <input type="radio" id="title" name="searchType" defaultChecked />
              <label htmlFor="title" className="text-black">Title</label>
            </div>
            
            <div className="flex items-center gap-1">
              <input type="radio" id="genre" name="searchType" />
              <label htmlFor="genre" className="text-black">Genre</label>
            </div>
            
            <div className="flex items-center gap-1">
              <input type="radio" id="author" name="searchType" />
              <label htmlFor="author" className="text-black">Author</label>
            </div>
            
            <div className="flex items-center">
              <select className="bg-white text-black border border-gray-300 rounded p-1 text-xs">
                <option>Sort by...</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Student Profile Section */}
        <div className="flex px-6 pb-6">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-200 p-4 rounded-md">
            <h2 className="text-black font-bold mb-4">Student Profile</h2>
            
            <div className="flex flex-col gap-3">
              <button className="bg-white text-black p-2 border border-gray-300 hover:bg-gray-100">
                Your Borrowed Books
              </button>
              <button className="bg-white text-black p-2 border border-gray-300 hover:bg-gray-100">
                All Books
              </button>
              <button className="bg-white text-black p-2 border border-gray-300 hover:bg-gray-100">
                Your Profile
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 ml-6 bg-white border border-gray-200">
            <div className="bg-gray-200 p-2 text-center text-black">
              Welcome to our Library, Marlits!
            </div>
            
            <div className="p-4 text-black">
              <p>You have borrowed 1 out of a maximum of 5 books.</p>
              
              <div className="mt-8">
                <div className="border border-gray-300 p-2 text-center mb-4">
                  Your Borrowed Books
                </div>
                
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Book Title</th>
                      <th className="border border-gray-300 p-2">Author</th>
                      <th className="border border-gray-300 p-2">Borrow Date</th>
                      <th className="border border-gray-300 p-2">Return Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">I miss you</td>
                      <td className="border border-gray-300 p-2">Earvin</td>
                      <td className="border border-gray-300 p-2">2024-02-01<br />17:58:52</td>
                      <td className="border border-gray-300 p-2">2024-07-01<br />17:58:52</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="text-black text-sm text-center">
            <div className="font-semibold">Quezon City University</div>
            <div>673 Quirino Highway Brgy. San Bartolome, Novaliches, Quezon City, Metro Manila</div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="bg-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}