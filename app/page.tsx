import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offer from "@/components/Offers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-stone-100">
      <Header />
      <Hero />
      <Offer />
      <Footer />
    </div>
  );
}
