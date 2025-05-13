// src/pages/EditBoatPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditBoatPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [boat, setBoat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/boats/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoat(response.data);
      } catch (err) {
        console.error('Failed to fetch boat', err);
        navigate('/myboats');
      } finally {
        setLoading(false);
      }
    };

    fetchBoat();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBoat({ ...boat, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/boats/edit/${id}`, boat, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMessage('Boat updated successfully!');
      setTimeout(() => navigate('/myboats'), 1000);
    } catch (err) {
      console.error('Update boat error', err.response?.data || err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading boat data...</p>;
  }

  if (!boat) {
    return <p className="text-center mt-10 text-red-600">Boat not found.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Edit Boat: {boat.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={boat.name}
            onChange={handleChange}
            placeholder="Boat Name"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="location"
            value={boat.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="price"
            value={boat.price}
            onChange={handleChange}
            placeholder="Price per day (€)"
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="image_url"
            value={boat.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded-lg px-4 py-2"
          />
          <textarea
            name="description"
            value={boat.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-4 py-2"
          ></textarea>
          <input
            type="number"
            name="capacity"
            value={boat.capacity || ''}
            onChange={handleChange}
            placeholder="Guest Capacity"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Update Boat
          </button>

          {message && (
            <p className="text-green-600 text-center font-semibold">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
