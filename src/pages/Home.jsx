import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome Icon component
import { faCoins } from '@fortawesome/free-solid-svg-icons'; // Coins icon

const Home = () => {
  const [friends, setFriends] = useState([]);

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
    console.log('fetching user data')
    fetch("https://userdashboardbackend.vercel.app/api/user/v1/get-users", {
      method : 'GET',
      credentials : 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(user)
        const filteredFriends = data.data.filter(friend => friend._id !== user.data._id);
        const sortedFriends = filteredFriends.sort((a, b) => b.Points - a.Points); // Sort by points (descending)
        setFriends(sortedFriends);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const claimPoints = async (username) => {
    try {
      await fetch("https://userdashboardbackend.vercel.app/api/user/v1/claim-points", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      // Refresh and sort the friend list again
      const updatedFriends = await fetch(
        "http://localhost:7000/api/user/v1/get-users"
      ).then((res) => res.json());

      const filteredUpdatedFriends = updatedFriends.data.filter(friend => friend._id !== user.data._id);
      const sortedUpdatedFriends = filteredUpdatedFriends.sort(
        (a, b) => b.Points - a.Points
      );


      setFriends(sortedUpdatedFriends);
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  return (
    <>
       <div className="flex justify-center items-center h-[89.5vh] bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg border w-3/4 max-w-4xl h-5/6">
        <h2 className="text-2xl font-bold mb-4 text-center">Friends List</h2>
        <ul className="divide-y divide-gray-200 overflow-y-auto h-[70%] px-4">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 px-4"
              onClick={() => claimPoints(friend.username)}
            >
              <div className="flex items-center space-x-4">
                <UserIcon className="h-6 w-6 text-gray-500" />
                <span className="font-medium text-gray-800">{friend.firstName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCoins} className="text-yellow-500" size="lg" />
                <span className="text-gray-600 font-semibold">{friend.Points}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    </>
  );
};

export default Home;
