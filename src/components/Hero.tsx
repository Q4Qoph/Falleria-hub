"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const destinations = [
    {
      name: "United States",
      image: "/modern-university-campus-in-usa-with-students.jpg",
      universities: "200+ Universities",
    },
    {
      name: "United Kingdom",
      image: "/historic-university-building-oxford-cambridge-styl.jpg",
      universities: "150+ Universities",
    },
    {
      name: "Canada",
      image: "/modern-canadian-university-campus-with-snow.jpg",
      universities: "100+ Universities",
    },
    {
      name: "Australia",
      image: "/sunny-australian-university-campus-with-modern-arc.jpg",
      universities: "80+ Universities",
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Section with Large Image */}
      <div className="relative h-screen flex items-center mx-auto overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/front-view-friends-checking-menu_23-2148212381.jpg"
            alt="Students studying abroad"
            fill
             className="object-cover  -scale-x-100"
            priority
          />
          <div
            className="absolute inset-0 bg-black/80"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-sm text-white">
              Your Journey to
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#00BF48 0%, #1A0BF4  100%)",
                }}
              >
                Global Education
              </span>
              Starts Here
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed drop-shadow-sm">
              Expert guidance for international university admissions. We
              simplify the process and help you achieve your dreams of studying
              abroad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-[#00BF48] group">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center h-10 px-8 rounded-lg text-base text-white font-medium border-2 backdrop-blur-sm hover:bg-accent hover:border-primary/50 transition-all"
              >
                Contact Us
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Partner Universities
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  98%
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Success Rate
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  50+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Study in Your Dream Destination
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore top universities across the globe and find the perfect fit
              for your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-white/80">{dest.universities}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Expert Guidance Every Step
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our experienced mentors provide personalized support throughout
                your entire application journey.
              </p>
              <div className="space-y-4">
                {[
                  "Profile Building",
                  "Application Strategy",
                  "Interview Prep",
                  "Visa Assistance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1A0BF4]" />
                    <span className="text-lg font-medium text-gray-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                 src="/group-friends-planning-trip-cafe .jpg"
                alt="Expert guidance"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/study-group-african-people.jpg"
                alt="Community support"
                fill
                className="object-cover"
              />
            </div>
            <div
              className={`transition-all duration-1000 order-1 lg:order-2 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Join a Global Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Connect with thousands of students pursuing their dreams at
                universities worldwide.
              </p>
              <div className="space-y-4">
                {[
                  "Peer Support Network",
                  "Alumni Connections",
                  "Study Groups",
                  "Career Guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1A0BF4]" />
                    <span className="text-lg font-medium text-gray-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
