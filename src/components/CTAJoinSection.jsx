// src/components/CTAJoinSection.jsx
export default function CTAJoinSection() {
    return (
      <section className="px-6 py-20 bg-white text-center">
        <div className="space-y-6">
          <h2 className="text-8xl md:text-5xl font-bold leading-tight">
            Are you a <span className="text-blue-600">yacht</span> owner?
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Start earning today by listing your boat with us. Reach thousands of travelers looking for their next adventure!
          </p>
          <button className="mt-6 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Join Us
          </button>
        </div>
      </section>
    );
  }
  