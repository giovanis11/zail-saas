// src/pages/HomePage.jsx
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import BoatCard from '../components/BoatCard';
import DestinationsGrid from '../components/DestinationsGrid';
import InfoCardsSection from '../components/InfoCardsSection';
import PopularBoatsSection from '../components/PopularBoatsSection';
import NoLicense from '../components/NoLicense';
import TestimonialsSection from '../components/Testimonials';
import FAQSection from '../components/FAQSenction';
import DownloadCTASection from '../components/DownloadCTASection';
import CTAJoinSection from '../components/CTAJoinSection';

export default function HomePage() {
  const boats = [
    {
      id: 1,
      name: "Ferretti 74'",
      price: 450,
      image: "/public/beach.jpg",
    },
    {
      id: 2,
      name: "Gerretti 99'",
      price: 450,
      image: "/boats/boat2.jpg",
    },
    {
      id: 3,
      name: "Gerretti 99'",
      price: 450,
      image: "/boats/boat3.jpg",
    },
    {
      id: 4,
      name: "Ferretti 74'",
      price: 450,
      image: "/boats/boat4.jpg",
    },
    {
      id: 5,
      name: "Gerretti 99'",
      price: 450,
      image: "/boats/boat5.jpg",
    },
    {
      id: 6,
      name: "Gerretti 99'",
      price: 450,
      image: "/boats/boat6.jpg",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Header />
      <HeroSearch />

      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-8">Near me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boats.map(boat => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </section>

      <DestinationsGrid />
      <InfoCardsSection />
      <PopularBoatsSection />
      <NoLicense />
      <TestimonialsSection />
      <FAQSection />
      <DownloadCTASection />
      <CTAJoinSection />
    </div>
  );
}
