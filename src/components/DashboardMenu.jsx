// src/components/DashboardMenu.jsx

import { Link, useNavigate } from "react-router-dom";
import { FaShip, FaPlus, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

export default function DashboardMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-center">Host Dashboard</h2>
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <Link
              to="/myboats"
              className="flex items-center gap-3 text-lg hover:text-blue-600"
            >
              <FaShip /> My Boats
            </Link>
          </li>
          <li>
            <Link
              to="/boats/create"
              className="flex items-center gap-3 text-lg hover:text-blue-600"
            >
              <FaPlus /> Create Boat
            </Link>
          </li>
          <li>
            
<Link to="/mybookings" className="flex items-center gap-3 text-lg hover:text-blue-600">
<FaClipboardList /> My Bookings
</Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-10 flex items-center gap-3 text-lg hover:text-red-500"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

<Link to="/mybookings" className="flex items-center gap-3 text-lg hover:text-blue-600">
  <FaClipboardList /> My Bookings
</Link>
