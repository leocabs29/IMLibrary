import { useState } from 'react';
import logo from '../../assets/logo.png'; // Assuming you have a logo image
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
export default function StudentDASHBOARD() {
  const [searchText, setSearchText] = useState('');
  
  return (
      <div className="w-full ">
        {/* Main content container */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header with logo and notifications */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center">
              <img 
                src={logo}
                className="rounded-full"
              />
              <h1 className="ml-3 font-bold text-gray-800">QCU Library</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to='/cart' className="relative">
                <div className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    2
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <AccountCircleIcon/>
                <span className="font-medium text-gray-700">Marlits</span>
              </div>
            </div>
          </div>
          
          {/* Search Section */}
          <div className="bg-gray-50 p-6 mx-6 my-4 rounded-md shadow-sm">
            <div className="text-center mb-3">
              <h2 className="text-gray-800 font-bold text-lg">What are you looking for?</h2>
            </div>
            
            <div className="flex mb-4">
              <input 
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for books, articles, database and more"
                className="flex-grow p-2 px-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r transition">
                Search
              </button>
            </div>
            
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <input type="radio" id="title" name="searchType" defaultChecked className="text-blue-500" />
                <label htmlFor="title" className="text-gray-700">Title</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="radio" id="genre" name="searchType" className="text-blue-500" />
                <label htmlFor="genre" className="text-gray-700">Genre</label>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="radio" id="author" name="searchType" className="text-blue-500" />
                <label htmlFor="author" className="text-gray-700">Author</label>
              </div>
              
              <div className="flex items-center">
                <select className="bg-white text-gray-700 border border-gray-300 rounded p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by Relevance</option>
                  <option>Sort by Title</option>
                  <option>Sort by Author</option>
                  <option>Sort by Date</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Student Dashboard Section */}
          <div className="flex px-6 pb-6 gap-6">
            {/* Left Sidebar */}
            <div className="w-64">
              <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                <h2 className="text-gray-800 font-bold mb-4 border-b pb-2">Student Menu</h2>
                
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition font-medium">
                    Your Borrowed Books
                  </button>
                  <Link to='/view-books' className="bg-white text-gray-700 p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
                    All Books
                  </Link>
                  <Link to='/profile' className="bg-white text-gray-700 p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
                    Your Profile
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="bg-blue-500 p-3 text-center text-white font-medium">
                Welcome to our Library, Marlits!
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-700">
                    You have borrowed <span className="font-bold text-blue-500">1</span> out of a maximum of <span className="font-bold">5</span> books.
                  </p>
                  
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/5 h-full bg-blue-500"></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="border-b border-gray-300 pb-2 mb-4">
                    <h3 className="font-bold text-gray-800">Your Borrowed Books</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left text-gray-700">Book Title</th>
                          <th className="border border-gray-300 p-2 text-left text-gray-700">Author</th>
                          <th className="border border-gray-300 p-2 text-left text-gray-700">Borrow Date</th>
                          <th className="border border-gray-300 p-2 text-left text-gray-700">Return Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 text-gray-700">I miss you</td>
                          <td className="border border-gray-300 p-2 text-gray-700">Earvin</td>
                          <td className="border border-gray-300 p-2 text-gray-500">
                            <div>2024-02-01</div>
                            <div className="text-xs">17:58:52</div>
                          </td>
                          <td className="border border-gray-300 p-2 text-gray-500">
                            <div>2024-07-01</div>
                            <div className="text-xs">17:58:52</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-200">
            <div className="text-gray-600 text-sm">
              <div className="font-semibold">Quezon City University</div>
              <div>673 Quirino Highway Brgy. San Bartolome, Novaliches, Quezon City</div>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}