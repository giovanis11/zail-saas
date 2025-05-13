// src/components/HeroSearch.jsx
export default function HeroSearch() {
    return (
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/beach.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h1 className="text-lg font-semibold text-center">The solution for boat renting.</h1>
            <p className="text-sm text-gray-600 text-center">Browse and book your perfect trip from top-rated owners.</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Location"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  