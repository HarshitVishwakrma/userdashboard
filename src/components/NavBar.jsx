// src/components/Navbar.jsx
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/solid';
import UserDetailsModal from './UserDetailsModal';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, refreshUserData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Refresh user data to ensure points are up-to-date
  useEffect(() => {
    if (user) refreshUserData();
  }, [user?.points]); // Trigger refresh when points change

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <h1
        className="text-white text-xl font-bold cursor-pointer"
        onClick={() => navigate('/home')}
      >
        Nexorand
      </h1>

      <div className="flex space-x-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? 'text-white font-semibold underline' : 'text-white'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive ? 'text-white font-semibold underline' : 'text-white'
          }
        >
          Leaderboard
        </NavLink>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <UserIcon
            className="h-8 w-8 text-white cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <UserDetailsModal
            user={user}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
