import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Login from './login';
import Signup from './signup';

function Homepage() {
  const [currentComponent, setCurrentComponent] = useState('homepage');

  if (currentComponent === 'login') {
    return <Login />;
  }

  if (currentComponent === 'signup') {
    return <Signup />;
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen py-25">
      <img src={Logo} alt="QCU LOGO" className="w-[200px] mb-10" />

      <div className="flex flex-col items-center gap-4">
        <button
          className="loginbtn bg-blue-500 text-white rounded-[20px] px-6 py-3 w-48 cursor-pointer"
          onClick={() => setCurrentComponent('login')}
        >
          Log in
        </button>
        <button
          className="signupbtn bg-blue-500 text-white rounded-[20px] px-6 py-3 w-48 cursor-pointer"
          onClick={() => setCurrentComponent('signup')}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Homepage;
