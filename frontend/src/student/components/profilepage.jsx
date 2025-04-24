import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-6">
        {/* Profile Header */}
        <h1 className="text-2xl font-bold text-center text-black mb-6">Profile</h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-200">
            <img 
              src="https://via.placeholder.com/128" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Name */}
        <h2 className="text-xl font-semibold text-center text-black mb-4">
          GYD SA FACEBOOK
        </h2>

        {/* User Info */}
        <div className="space-y-4">
          {['Username', 'Password', 'MPIN', 'Contact Information'].map((label, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-md shadow-sm"
            >
              <p className="text-gray-600 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
