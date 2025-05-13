// BoatDetailsPage.jsx

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BoatDetailsPage() {
  const { index } = useParams();
  const [boat, setBoat] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [days, setDays] = useState(0);

  const serviceFee = 20;

  useEffect(() => {
    const fetchBoat = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/boats/all');
        setBoat(response.data[index]);
      } catch (err) {
        console.error('Failed to fetch boat details', err);
      }
    };
    fetchBoat();
  }, [index]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      setDays(diffDays);
    }
  }, [startDate, endDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || days <= 0) {
      alert('Please select valid dates.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/bookings/create', {
        boat_id: boat.id,
        start_date: startDate,
        end_date: endDate,
        user_id: 1
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error('Booking request failed', err.response?.data || err.message);
      alert('Booking request failed!');
    }
  };

  if (!boat) {
    return <div className="min-h-screen flex items-center justify-center">Loading boat details...</div>;
  }

  const subtotal = days * boat.price;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 px-12 pt-10">
        <img
          src={boat.image_url}
          alt={boat.name}
          className="w-full h-[460px] object-cover lg:col-span-2 rounded-xl"
        />
        <div className="grid grid-cols-2 gap-2">
          <img src={boat.image_url} alt="1" className="w-full h-[225px] object-cover rounded-xl" />
          <img src={boat.image_url} alt="2" className="w-full h-[225px] object-cover rounded-xl" />
          <img src={boat.image_url} alt="3" className="w-full h-[225px] object-cover rounded-xl" />
          <img src={boat.image_url} alt="4" className="w-full h-[225px] object-cover rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto px-10 py-12">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{boat.name}</h1>
          <p className="text-gray-600 text-lg">{boat.location}</p>
          <p className="text-sm text-gray-500">{boat.capacity} max. guests</p>
          <p className="text-gray-700 leading-relaxed text-md border-t pt-4">{boat.description}</p>
        </div>

        <div className="sticky top-24 border border-gray-200 rounded-xl p-6 shadow space-y-4 h-fit">
          <p className="text-2xl font-semibold text-gray-900">
            €{boat.price} <span className="text-base font-normal text-gray-600">/day</span>
          </p>

          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-gray-700">
              <div>
                <label className="block mb-1">Check-in</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Checkout</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg font-semibold"
            >
              Reserve
            </button>

            {bookingSuccess && (
              <p className="text-green-600 font-semibold text-center">Booking Request Sent!</p>
            )}
          </form>

          <p className="text-center text-sm text-gray-600 mt-2">You won't be charged yet</p>

          {days > 0 && (
            <>
              <div className="text-sm space-y-2 text-gray-700 border-t pt-4">
                <div className="flex justify-between">
                  <p>€{boat.price} x {days} days{days > 1 ? 's' : ''}</p>
                  <p>€{subtotal}</p>
                </div>
                <div className="flex justify-between underline">
                  <p>Service fee</p>
                  <p>€{serviceFee}</p>
                </div>
              </div>
              <div className="border-t pt-4 text-lg font-semibold flex justify-between">
                <p>Total</p>
                <p>€{total}</p>
              </div>
            </>
          )}

          <Link
            to="/browse"
            className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
