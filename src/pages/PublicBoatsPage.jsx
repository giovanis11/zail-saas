// src/pages/PublicBoatsPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Star, Users } from 'lucide-react';

export default function PublicBoatsPage() {
  const [boats, setBoats] = useState([]);
  const [filteredBoats, setFilteredBoats] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [destination, setDestination] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [guests, setGuests] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/boats/all');
        setBoats(response.data);
        setFilteredBoats(response.data);
      } catch (err) {
        console.error('Failed to fetch boats', err);
      }
    };

    fetchBoats();
  }, []);

  const applyFilters = () => {
    let filtered = boats;
    if (destination) {
      filtered = filtered.filter((b) => b.location.toLowerCase().includes(destination.toLowerCase()));
    }
    if (type) {
      filtered = filtered.filter((b) => b.description.toLowerCase().includes(type.toLowerCase()));
    }
    if (minPrice) {
      filtered = filtered.filter((b) => b.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((b) => b.price <= parseFloat(maxPrice));
    }
    if (guests) {
      filtered = filtered.filter((b) => b.capacity >= parseInt(guests));
    }
    setFilteredBoats(filtered);
  };

  const resetFilters = () => {
    setDestination('');
    setType('');
    setMinPrice('');
    setMaxPrice('');
    setGuests('');
    setStartDate('');
    setEndDate('');
    setFilteredBoats(boats);
    setSortBy('relevance');
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sorted = [...filteredBoats];
    if (value === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setFilteredBoats(sorted);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="space-y-6 col-span-1">
            <div className="border rounded-xl p-6 shadow space-y-4">
              <h2 className="text-xl font-bold text-gray-700">Filters</h2>
              <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="number"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Boat Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Any Type</option>
                  <option value="motor">🚤 Motor</option>
                  <option value="sail">⛵ Sail</option>
                  <option value="yacht">🛥️ Yacht</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Available Boats</h1>
              <div className="flex items-center gap-2">
                <label className="text-gray-600">Sort by</label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-3 py-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBoats.map((boat, index) => (
                <Link
                  to={`/boat/${index}`}
                  key={boat.id}
                  className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={boat.image_url}
                    alt={boat.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 space-y-1">
                    <h2 className="text-lg font-bold text-gray-800 truncate">{boat.name}</h2>
                    <p className="text-sm text-gray-500">{boat.location}</p>
                    <p className="text-gray-800 font-semibold">€{boat.price}/day</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Users size={14} /> {boat.capacity || 6} guests</span>
                      <span className="flex items-center gap-1 text-yellow-500"><Star size={16} /> {boat.rating || '4.5'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
