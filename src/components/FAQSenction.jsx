// src/components/FAQSection.jsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: 'How can I book a yacht?',
      answer: 'You can easily book a yacht by first choosing the yacht and then following the process of online booking.',
    },
    {
      id: 2,
      question: 'What is the cancel policy?',
      answer: 'You can cancel up to 24 hours before departure for a full refund, unless otherwise stated.',
    },
    {
      id: 3,
      question: 'Do you offer packages or trips?',
      answer: 'Yes, many of our yachts come with curated trips or customizable packages based on your needs.',
    },
    {
      id: 4,
      question: 'Is the app safe to use?',
      answer: 'Our platform uses SSL encryption and secure payment gateways to protect your data.',
    },
    {
      id: 5,
      question: 'What is the privacy policy?',
      answer: 'We never sell or share your data. You can read our full privacy policy on our website.',
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side Text */}
        <div className="space-y-6">
          <h3 className="text-gray-500 text-sm">FAQ?</h3>
          <h2 className="text-3xl font-bold">
            Sail with <span className="text-blue-600">Zail</span>
          </h2>
          <p className="text-gray-600 text-base">
            Discover a world of adventure and set sail for your dream cruise with our team.
          </p>
        </div>

        {/* Right Side Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <ChevronDown className={`transition-transform ${openId === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {openId === faq.id && (
                <div className="py-2 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
