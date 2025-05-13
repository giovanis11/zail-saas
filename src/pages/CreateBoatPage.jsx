// src/pages/CreateBoatPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateBoatPage() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://127.0.0.1:8000/api/boats/create',
        {
          name,
          location,
          price: parseFloat(price),
          description,
          image_url: imageUrl,
          capacity: parseInt(capacity),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log('Boat created!');
        navigate('/dashboard');
      } else {
        setError('Failed to create boat.');
      }
    } catch (err) {
      console.error('Create boat error:', err);
      setError('Failed to create boat.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Add a New Boat</h1>

        {error && <p className="text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Boat Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Price per day (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Guest Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Add Boat
          </button>
        </form>
      </div>
    </div>
  );
}
