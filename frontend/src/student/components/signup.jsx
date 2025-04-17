import React from 'react';
import logo from '../../assets/logo.png';

function login() {
  return (
    <div className="flex h-screen">
      {/* Left Area */}
      <div className="w-1/3 bg-gray-100 flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="w-24 mb-4" />
        <h1 className="text-xl font-bold">Welcome!</h1>
      </div>

      {/* Right Area */}
      <div className="w-2/3 flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-6">SIGN UP</h2>
        <form className="w-1/2 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">MPIN</label>
            <input
              type="text"
              placeholder="Enter MPIN"
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <button className="bg-green-500 text-white py-2 rounded-lg mt-4 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
