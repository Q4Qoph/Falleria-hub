"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import Contact from "../components/Contact";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Benefits from "../components/Benefits";

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
