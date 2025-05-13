// src/pages/MyBookingsPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const user_id = 1; // Temporary hardcoded owner id (until real auth)

      const response = await axios.get('http://127.0.0.1:8000/api/owner/bookings', {
        params: { user_id: user_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (err) {
      console.error('Failed to fetch owner bookings', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/bookings/update/${bookingId}`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      console.error('Failed to update booking status', err.response?.data || err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading booking requests...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Booking Requests for My Boats</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No booking requests yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl p-6 shadow-md space-y-3">
                <h2 className="text-2xl font-bold">Boat ID: {booking.boat_id}</h2>
                <p className="text-gray-600">Start: {booking.start_date}</p>
                <p className="text-gray-600">End: {booking.end_date}</p>
                <p className="text-gray-800 font-semibold text-lg">Total: €{booking.total_price.toFixed(2)}</p>
                <p className={`text-md font-semibold ${
                  booking.status === "accepted" ? "text-green-600" :
                  booking.status === "rejected" ? "text-red-600" :
                  "text-yellow-600"
                }`}>
                  Status: {booking.status}
                </p>

                {booking.status === "pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'accepted')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'rejected')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
