import { useState } from 'react';
import { Search, MessageCircle, ShoppingCart, HelpCircle, Send, X, Minus } from 'lucide-react';

export default function SearchBook() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with your library search today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const [selectedBook, setSelectedBook] = useState({
    title: "The padayon series : disciplines and ideas in the social sciences / Arleigh Ross D. Dela Cruz, Cecile C. Fadrigon and Diana J. Mendoza.",
    authors: "by Dela Cruz, Arleigh Ross Fadrigon, Cecile C [Author] Mendoza, Diana J [Author] Mactal, Ronaldo B [Project Director]",
    materialType: "Text",
    format: "print",
    libraryType: "Not fiction",
    publisher: "Quezon City : Phoenix Publishing House, Inc, 2016",
    availability: "Items available for loan: QUEZON CITY UNIVERSITY LIBRARY SAN BARTOLOME (1)[Call number: Fil 300 D332 2016]."
  });

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', message: newMessage }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        message: `Ano yang "${newMessage}". hindi ko maintindihan bisaya ka ba?` 
      }]);
    }, 1000);
    
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col rounded-lg overflow-hidden border border-gray-200 relative">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/70/70" alt="University Logo" className="h-16 w-16 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative bg-gray-200 rounded-full p-2">
            <ShoppingCart size={24} className="text-black" />
            <div className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</div>
          </div>
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src="/api/placeholder/50/50" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-300 mx-6 my-4 rounded-full p-6">
        <div className="text-center mb-3 font-medium text-lg">What are you looking for?</div>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books, articles, database and more"
            className="flex-grow bg-white rounded-l-md px-4 py-2 focus:outline-none text-sm"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-r-md font-medium">
            Search
          </button>
        </div>

        {/* Filter options */}
        <div className="flex justify-center mt-4 text-sm">
          <div className="flex space-x-6 items-center">
            <label className="flex items-center">
              <input type="radio" name="filter" value="title" className="mr-2" defaultChecked />
              <span>Title</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="filter" value="genre" className="mr-2" />
              <span>Genre</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="filter" value="author" className="mr-2" />
              <span>Author</span>
            </label>
            <div className="flex items-center">
              <select className="ml-4 bg-white rounded px-2 py-1 text-sm">
                <option value="">Campus</option>
                <option value="main">San Bartolome Campus</option>
                <option value="north">Batasan Campus</option>
                <option value="south">San Francisco Campus</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-grow mx-6 bg-white border border-gray-300">
        <div className="border-b border-gray-300 p-2">
          <span className="font-bold">I.</span>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <a href="#" className="text-blue-600 font-medium hover:underline">
            {selectedBook.title}
          </a>
          <div className="text-sm text-gray-700">{selectedBook.authors}</div>
          <div className="text-xs text-gray-600 mt-1">
            Material type: <span className="font-medium">{selectedBook.materialType}</span>; 
            Format: <span className="font-medium">{selectedBook.format}</span>; 
            Library type: <span className="font-medium">{selectedBook.libraryType}</span>
          </div>
          <div className="text-xs text-gray-700 mt-1">{selectedBook.publisher}</div>
          <div className="text-xs mt-1">
            Availability: <span className="text-green-600">{selectedBook.availability}</span>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <button className="border border-gray-300 rounded px-3 py-1 text-xs flex items-center hover:bg-gray-100">
              <span className="mr-1">🔖</span> Reserve
            </button>
            <button className="border border-gray-300 rounded px-3 py-1 text-xs flex items-center hover:bg-gray-100">
              <span className="mr-1">🛒</span> Add to shelf
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-sm text-gray-600 flex justify-between items-center border-t border-gray-200">
        <div className="flex flex-col items-center mx-auto">
          <div className="font-semibold">Quezon City University</div>
          <div className="text-xs">673 Quirino Highway Brgy. San Bartolome, Novaliches, Quezon City, Metro Manila</div>
        </div>
        <div className="flex space-x-3">
          <button 
            className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            onClick={() => setShowChatbot(!showChatbot)}
          >
            <MessageCircle size={20} className="text-gray-700" />
          </button>
          <button className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
            <HelpCircle size={20} className="text-gray-700" />
          </button>
        </div>
      </footer>

      {/* Chatbot Popup */}
      {showChatbot && (
        <div className="absolute bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col" style={{ height: '400px' }}>
          {/* Chatbot Header */}
          <div className="bg-gray-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/api/placeholder/30/30" alt="Bot Avatar" className="h-8 w-8 rounded-full mr-2" />
              <div>
                <div className="font-medium">Chatbot</div>
                <div className="text-xs text-blue-100">Online</div>
              </div>
            </div>
            <button 
              className="text-white hover:bg-gray-700 rounded-full p-1"
              onClick={() => setShowChatbot(false)}
            >
              <Minus size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-3 overflow-y-auto bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-gray-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 bg-gray-100 rounded-l-full focus:outline-none"
              />
              <button 
                className="bg-gray-600 text-white px-4 py-2 rounded-r-full"
                onClick={sendMessage}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}