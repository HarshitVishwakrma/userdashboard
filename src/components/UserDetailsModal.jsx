// src/components/UserDetailsModal.jsx
const UserDetailsModal = ({ user, isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-semibold mb-4">User Details</h3>
          <ul className="mb-4">
            <li><strong>Name:</strong> {user.data.firstName} {user.data.lastName}</li>
            <li><strong>Email:</strong> {user.data.email}</li>
            <li><strong>Points:</strong> {user.data.Points}</li>
          </ul>
          <div className="flex space-x-4">
            <button
              onClick={onLogout}
              className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserDetailsModal;
  