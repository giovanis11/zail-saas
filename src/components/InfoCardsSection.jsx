// src/components/InfoCardsSection.jsx
export default function InfoCardsSection() {
    return (
      <section className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Flexible Cancellation */}
          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-md transition border border-black/10">
            <h3 className="text-[40px] font-bold mb-4">Flexible Cancellation</h3>
            <p className="text-gray-600 text-sm">
              You can cancel up to 24 hours before your trip for a full refund. Book with peace of mind.
            </p>
          </div>
  
          {/* Can we assist you? */}
          <div className="bg-[rgb(1,41,69)] rounded-2xl p-8 shadow hover:shadow-md transition border border-black/30">
            <h3 className="text-[40px] text-white font-bold mb-4">Can we assist you?</h3>
            <p className="text-white text-sm">
              Need help with your booking or have a special request? Our team is here 24/7 to assist you!
            </p>
          </div>
  
        </div>
      </section>
    );
  }
  