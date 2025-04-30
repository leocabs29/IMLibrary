import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // For better notifications

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: "",
    email: "",
    role: "",
    status: "",
    joinDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

 
  useEffect(() => {

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        // Transform the data so a more usable format
        const transformedData = data.map((user, index) => ({
          id: user[0], // Using index as ID temporarily - ideally should come from backend
          name: user[1] , // Adjust according to the correct user data
          email: user[2] ,
          role:user[3], // Adjust according to the correct user data
          status: user[4] ,
          joinDate: user[5], // Adjust according to the correct user data
        }));
  
        setUsers(transformedData);
        console.log(transformedData);
        setError(null);
      } catch (err) {
        setError(`Error fetching users: ${err.message}`);
        toast.error(`Failed to load users: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    
    fetchUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setIsEditing(true);
      setCurrentUser(user);  // <- populate the modal form fields
    } else {
      setIsEditing(false);
      setCurrentUser({
        id: '',
        name: "",
        email: "",
        role: "",  // set a sensible default
        status: "",
        joinDate:''
      });
    }
    setIsModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isEditing) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, currentUser]); // Add the new user to the users list
    }
  
    handleCloseModal();
  };
  

  const handleToggleStatus = (id) => {
    setUsers(users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (String(user.name).toLowerCase().includes(searchTerm.toLowerCase())) ||
      (String(user.email).toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Manage Users</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <select
              className="pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Staff">Staff</option>
            </select>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Role", "Status", "Join Date", "Actions"].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                        {(user.name || "?").charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
  onClick={() => handleToggleStatus(user.id)}
  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
    user.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }`}
>
  {user.status}
</button>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="ml-4 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="bg-white rounded-lg shadow-lg w-full sm:w-96">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold">{isEditing ? "Edit" : "Add"} User</h3>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={currentUser.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label  className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                       
                        value={currentUser.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="Student">Active</option>
                        <option value="Faculty">Inactive</option>
                        
                      </select>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="px-6 py-3 text-right">
                <button
                  onClick={handleCloseModal}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
