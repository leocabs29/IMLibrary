export default function BookCartPage() {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Main content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
          {/* Header with logo and icons */}
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
                <div className="bg-gray-200 rounded-full p-1 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-200 rounded-full p-2 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    3
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
                  <option></option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Book Cart Section */}
          <div className="flex px-6 pb-6">
            {/* Left Sidebar */}
            <div className="w-48 bg-gray-200 p-4 rounded-md">
              <h2 className="text-black font-bold mb-4">Your Book Cart</h2>
            </div>
            
            {/* Main Content - Book Table */}
            <div className="flex-1 ml-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 text-black">ISBN</th>
                      <th className="p-2 text-black">Title</th>
                      <th className="p-2 text-black">Author</th>
                      <th className="p-2 text-black">Genre</th>
                      <th className="p-2 text-black">Campus Location</th>
                      <th className="p-2 text-black"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className="p-2 text-black">1</td>
                        <td className="p-2 text-black">Divergent</td>
                        <td className="p-2 text-black">Roth, Veronica</td>
                        <td className="p-2 text-black">Science fiction</td>
                        <td className="p-2 text-black">QCU-San Bartolome</td>
                        <td className="p-2">
                          <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                            Reserve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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