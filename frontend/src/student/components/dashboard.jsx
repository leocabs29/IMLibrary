import { useState } from 'react';

export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top navigation bar */}
      <div className="bg-black text-gray-400 text-xs p-2">
        Homepage(Student Side)
      </div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
        {/* Header with logo and search */}
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/api/placeholder/60/60" 
              alt="QCU Logo" 
              className="rounded-full border-2 border-blue-500"
            />
            <span className="text-black font-medium">QCU Library Resources & Services</span>
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
        
        {/* Banner Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-yellow-300 opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <img 
              src="/api/placeholder/80/80" 
              alt="QCU Logo" 
              className="mb-2"
            />
            <div className="text-4xl font-serif">Library</div>
            <div className="text-2xl font-serif text-yellow-600">QUEZON CITY UNIVERSITY</div>
            <div className="text-sm mt-2">SAN BARTOLOME | SAN FRANCISCO | BATASAN</div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="text-black text-sm">
            <div>Quezon City University</div>
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}