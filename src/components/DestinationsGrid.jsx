// src/components/DestinationsGrid.jsx
export default function DestinationsGrid() {
    const destinations = [
      { id: 1, name: 'Mykonos', image: '/public/beach.jpg' },
      { id: 2, name: 'Santorini', image: '/destinations/santorini.jpg' },
      { id: 3, name: 'Athens', image: '/destinations/athens.jpg' },
      { id: 4, name: 'Crete', image: '/destinations/crete.jpg' },
      { id: 5, name: 'Rhodes', image: '/destinations/rhodes.jpg' },
      { id: 6, name: 'Corfu', image: '/destinations/corfu.jpg' },
    ];
  
    return (
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map(dest => (
            <div key={dest.id} className="relative rounded-2xl overflow-hidden group shadow hover:shadow-lg transition">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  