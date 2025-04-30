import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../../assets/logo.png';
import Login from './login';
import Signup from './signup';

function Homepage() {
  const [currentComponent, setCurrentComponent] = useState('homepage');
  const [hoveredButton, setHoveredButton] = useState(null);

  if (currentComponent === 'login') {
    return <Login onBackToHome={() => setCurrentComponent('homepage')} />;
  }

  if (currentComponent === 'signup') {
    return <Signup onBackToHome={() => setCurrentComponent('homepage')} />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <motion.div 
        className="relative z-10 flex flex-col items-center max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo & Branding */}
        <motion.div 
          className="mb-12 text-center flex flex-col justify-center items-center"
          variants={itemVariants}
        >
          <img src={Logo} alt="QCU LOGO" className="w-40 h-40 object-contain mb-6 drop-shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome to QCU Library</h1>
          <p className="text-gray-600 text-lg">Library Manangement System</p>
        </motion.div>

        {/* Main Content - Cards */}
        <motion.div 
          className="w-full sm:flex sm:justify-center sm:space-x-6 sm:mb-8"
          variants={itemVariants}
        >
          {/* Login Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 sm:mb-0 sm:w-1/2 relative overflow-hidden border border-blue-100"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="absolute  -right-12 -top-12 bg-blue-500 rotate-12 w-24 h-24 rounded-lg opacity-20"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 ">Already a Member?</h3>
            <p className="text-gray-600 mb-6">Sign in to access your dashboard, courses, and academic records.</p>
            <motion.button
              className={`w-full py-3 px-6 rounded-xl font-medium transition duration-200 ease-in-out ${
                hoveredButton === 'login' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setCurrentComponent('login')}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
          </motion.div>

          {/* Sign Up Card */}
          <motion.div 
            className="bg-white rounded-2xl flex flex-col space-y-13 shadow-lg p-6  sm:w-1/2 relative overflow-hidden border border-green-100"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <div className="absolute -right-12 -top-12 bg-green-500 rotate-12 w-24 h-24 rounded-lg opacity-20"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">New Here?</h3>
            <p className="text-gray-600 m">Create an account to start your academic journey with us.</p>
            <motion.button
              className={`w-full py-3 px-6 rounded-xl font-medium transition duration-200 ease-in-out ${
                hoveredButton === 'signup' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-500 text-white'
              }`}
              onClick={() => setCurrentComponent('signup')}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <h4 className="text-gray-700 font-medium mb-2">Need Help?</h4>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-200">Contact Support</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-200">FAQs</a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-12 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} QCU - Quezon City University. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Homepage;