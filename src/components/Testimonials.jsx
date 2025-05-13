// src/components/TestimonialsSection.jsx
export default function TestimonialsSection() {
    const testimonials = [
      {
        id: 1,
        name: 'Maria P.',
        review: 'Amazing experience! The boat was beautiful and the service was excellent. Highly recommend!',
        photo: '/testimonials/user1.jpg',
        rating: 5,
      },
      {
        id: 2,
        name: 'John D.',
        review: 'Perfect weekend getaway. Easy booking process and very professional team.',
        photo: '/testimonials/user2.jpg',
        rating: 4.8,
      },
      {
        id: 3,
        name: 'Sophia K.',
        review: 'The best way to explore Greece! Everything was organized perfectly. Loved it!',
        photo: '/testimonials/user3.jpg',
        rating: 5,
      },
    ];
  
    return (
      <section className="px-6 py-12 bg-blue-50">
        <h2 className="text-2xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center space-y-4">
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <h3 className="font-bold">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.review}</p>
              <div className="text-yellow-400 text-lg">
                {'★'.repeat(Math.floor(t.rating))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  