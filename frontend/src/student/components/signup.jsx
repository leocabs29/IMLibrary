import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FiUser, FiMail, FiLock, FiKey, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

function Signup({ onBackToHome }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mpin: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMpin, setShowMpin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
    
    // Clear general error message
    if (signupError) {
      setSignupError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and a number";
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
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
    setSignupError("");
    
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          mpin: formData.mpin
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate("/login"); // Or use onBackToHome to return to homepage
      } else {
        setSignupError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSignupError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Area - Branding */}
      <div className="hidden md:flex md:w-2/5 lg:w-1/3 bg-gradient-to-br from-green-500 to-green-700 flex-col items-center justify-center text-white p-8">
        <img src={logo} alt="Logo" className="w-32 h-32 object-contain mb-6" />
        <h1 className="text-3xl font-bold mb-4">Join Our Community</h1>
        <p className="text-center text-lg mb-8">Create an account to start your academic journey with us.</p>
        <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm w-4/5">
          <p className="text-sm italic mb-4">"The beautiful thing about learning is that no one can take it away from you."</p>
          <p className="text-right font-medium">- B.B. King</p>
        </div>
      </div>

      {/* Right Area - Signup Form */}
      <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="md:hidden flex justify-center mb-4">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
            </div>
            
            {/* Back button */}
            {onBackToHome && (
              <button 
                onClick={onBackToHome} 
                className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 flex items-center text-sm"
              >
                <FiArrowLeft className="mr-1" /> Back to Home
              </button>
            )}
            
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in your details to get started
            </p>
          </div>
          
          {signupError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{signupError}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields - Side by Side */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* First Name */}
              <div className="w-full sm:w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-3 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
              </div>
              
              {/* Last Name */}
              <div className="w-full sm:w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-3 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

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
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                  placeholder="your.email@example.com"
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                  placeholder="Create a strong password"
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
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters with uppercase, lowercase letters and numbers
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
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
                  autoComplete="off"
                  value={formData.mpin}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.mpin ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500`}
                  placeholder="4-6 digit PIN"
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
              <p className="mt-1 text-xs text-gray-500">
                This PIN will be used as an additional security measure during login
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;