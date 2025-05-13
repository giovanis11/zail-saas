// src/pages/MyBoatsPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyBoatsPage() {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/boats/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoats(response.data);
      } catch (err) {
        console.error('Failed to fetch boats', err);
      }
    };

    fetchBoats();
  }, []);

  const handleDeleteBoat = async (boatId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this boat?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/boats/delete/${boatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoats((prev) => prev.filter((b) => b.id !== boatId));
    } catch (err) {
      console.error('Delete boat error', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Boats</h1>
          <Link
            to="/boats/create"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold"
          >
            + Add New Boat
          </Link>
        </div>

        {boats.length === 0 ? (
          <p className="text-center text-gray-500">No boats added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boats.map((boat) => (
              <div key={boat.id} className="bg-white rounded-xl p-6 shadow-md space-y-3 relative">
                <img
                  src={boat.image_url}
                  alt={boat.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-xl font-bold">{boat.name}</h2>
                <p className="text-gray-600">{boat.location}</p>
                <p className="text-gray-800 font-semibold">€{boat.price} per day</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleDeleteBoat(boat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex-1"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/boats/edit/${boat.id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full flex-1 text-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
