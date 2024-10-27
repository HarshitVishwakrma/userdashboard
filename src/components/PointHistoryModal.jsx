import { useEffect, useState } from "react";


const PointHistoryModal = ({ user, onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://leaderboard-gules.vercel.app/api/user/v1/your-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username : user.username}),
        });
        const data = await response.json();
        console.log(data)
        setHistory(data.data || []);
      } catch (error) {
        console.error('Error fetching point history:', error);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Point History</h3>
        <ul className="divide-y divide-gray-200 overflow-y-auto h-60">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <li key={index} className="py-2">
                <span>{new Date(entry.date).toLocaleDateString()}</span> -{' '}
                <span>{entry.pointsAwarded} pts</span>
              </li>
            ))
          ) : (
            <p className="text-center">No history available.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PointHistoryModal;
