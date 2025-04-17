export default function ProfilePage() {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg overflow-hidden p-6">
          {/* Profile Header */}
          <h1 className="text-black text-2xl font-bold text-center mb-6">Profile</h1>
          
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100">
              <img 
                src="/api/placeholder/128/128" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* User Name */}
          <h2 className="text-black text-xl font-medium text-center mb-6">GYD SA FACEBOOK</h2>
          
          {/* Form Fields */}
          <div className="space-y-3">
            <div className="bg-gray-200 p-3 rounded-md">
              <p className="text-gray-500">Username</p>
            </div>
            
            <div className="bg-gray-200 p-3 rounded-md">
              <p className="text-gray-500">Password</p>
            </div>
            
            <div className="bg-gray-200 p-3 rounded-md">
              <p className="text-gray-500">MPIN</p>
            </div>
            
            <div className="bg-gray-200 p-3 rounded-md">
              <p className="text-gray-500">Contact Information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }