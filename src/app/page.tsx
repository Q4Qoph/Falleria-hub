"use client";

// import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import Contact from "../components/Contact";
import CTA from "../components/CTA";
import Benefits from "../components/Benefits";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Benefits />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
