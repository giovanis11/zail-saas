// src/components/Header.jsx
import LogoutButton from "./LogoutButton";

export default function Header() {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            Zail
          </div>
  
           {/* Navigation Links */}
          <nav className="hidden md:flex gap-8 text-gray-600 font-medium text-sm">
            <a href="#near" className="hover:text-blue-600 transition">Near Me</a>
            <a href="#destinations" className="hover:text-blue-600 transition">Destinations</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          </nav> 
  
          {/* Login / Sign Up */}
          <div className="flex gap-3">
            <button className="text-blue-600 font-medium hover:underline">
              Login
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition">
              Sign Up
            </button>
            <LogoutButton />
          </div>
  
        </div>
      </header>
    );
  }
  