import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FiMail, FiLock, FiKey, FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mpin: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showMpin, setShowMpin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
    // Clear general login error when user modifies any field
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // MPIN validation
    if (!formData.mpin) {
      newErrors.mpin = "MPIN is required";
    } else if (!/^\d{4,6}$/.test(formData.mpin)) {
      newErrors.mpin = "MPIN must be 4-6 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setLoginError("");
    
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.user.user_id);
        localStorage.setItem("token", data.token); // Store token if your API returns one
        localStorage.setItem("user_role", data.user.role.toLowerCase());
        
        // Check user role and redirect
        if (data.user.role.toLowerCase() === "student") {
          navigate("/student-dashboard2");
        } else if (data.user.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          setLoginError("Unknown user role detected");
        }
      } else {
        setLoginError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotCredentials = () => {
    navigate("/forgot-password");
    // Or implement a modal/popup for password reset
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Area - Branding */}
      <div className="hidden md:flex md:w-2/5 lg:w-1/3 bg-gradient-to-br from-green-500 to-green-700 flex-col items-center justify-center text-white p-8">
        <img src={logo} alt="Logo" className="w-32 h-32 object-contain mb-6" />
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-center text-lg mb-8">Sign in to access your account and manage your resources.</p>
        <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm w-4/5">
          <p className="text-sm italic mb-4">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
          <p className="text-right font-medium">- Malcolm X</p>
        </div>
      </div>

      {/* Right Area - Login Form */}
      <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="md:hidden flex justify-center mb-4">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your credentials to continue
            </p>
          </div>
          
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } rounded-lg bg-white text-gray-900`}
                    placeholder="Your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } rounded-lg bg-white text-gray-900`}
                    placeholder="Your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* MPIN Field */}
              <div>
                <label htmlFor="mpin" className="block text-sm font-medium text-gray-700">
                  MPIN (Mobile PIN)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mpin"
                    name="mpin"
                    type={showMpin ? "text" : "password"}
                    autoComplete="one-time-code"
                    value={formData.mpin}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.mpin ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                    } rounded-lg bg-white text-gray-900`}
                    placeholder="Your MPIN"
                    maxLength={6}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowMpin(!showMpin)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showMpin ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.mpin && (
                  <p className="mt-1 text-sm text-red-600">{errors.mpin}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button"
                  onClick={handleForgotCredentials}
                  className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                >
                  Forgot password or ID?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;