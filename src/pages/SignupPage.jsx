// src/pages/SignupPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call relative path—let Nginx proxy /api to your backend
      const response = await axios.post(
        `/api/signup`,
        { email, password }
      );

      if (response.data.success) {
        setSuccessMsg('Account created! Redirecting to login…');
        setError('');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(response.data.message || 'Signup failed.');
        setSuccessMsg('');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
      setSuccessMsg('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create a new account
        </h2>

        {error && <p className="text-center text-red-500">{error}</p>}
        {successMsg && <p className="text-center text-green-500">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
);
}
