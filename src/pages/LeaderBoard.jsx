// src/pages/Leaderboard.jsx
import { useContext, useEffect, useState } from 'react';
import PointHistoryModal from '../components/PointHistoryModal';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/solid'; // User icon from Heroicons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome Icon component
import { faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons'; // Trophy and Coins icons

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    if(!user){
      navigate('/login')
    }

    fetch('https://leaderboard-gules.vercel.app/api/user/v1/get-users')
      .then((res) => res.json())
      .then((data) => {
        const sortedUsers = data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);


  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  return (
    // <div className="p-4">
    //   <h2 className="text-2xl mb-4">Leaderboard</h2>
    //   <ul>
    //     {users.map((user) => (
    //       <li
    //         key={user._id}
    //         className="p-2 border-b cursor-pointer hover:bg-gray-100"
    //         onClick={() => handleUserClick(user)}
    //       >
    //         {user.firstName} - {user.Points} pts
    //       </li>
    //     ))}
    //   </ul>

    //   {isModalOpen && (
    //     <PointHistoryModal
    //       user={selectedUser}
    //       onClose={() => setIsModalOpen(false)}
    //     />
    //   )}
    // </div>

    <div className="flex justify-center items-center h-[89.5vh] bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg border w-3/4 max-w-4xl h-5/6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Leaderboard <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
      </h2>
      {/* Scrollable List Container */}
      <ul className="divide-y divide-gray-200 overflow-y-auto h-[70%] px-4">
        {users.map((user, index) => (
          <li
            key={user._id}
            className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50"
            onClick={() => openModal(user)}
          >
            <div className="flex items-center space-x-4">
              <UserIcon className="h-8 w-8 text-gray-500" />
              <span className="font-medium text-gray-800">
                {index + 1}. {user.firstName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCoins} className="text-yellow-500" size="lg" />
              <span className="text-gray-600 font-semibold">{user.Points}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for displaying point history */}
      {isModalOpen && selectedUser && (
        <PointHistoryModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  </div>
  );
};

export default Leaderboard;
