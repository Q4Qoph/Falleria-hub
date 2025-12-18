"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import StudyApplicationForm from "@/components/StudyApplicationForm";
import {
  GraduationCap,
  Users,
  Clock,
  Briefcase,
  BookOpen,
  Building,
} from "lucide-react";

export default function StudyInTheUKPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section with Overlay Form */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/historic-university-building-oxford-cambridge-styl.jpg"
            alt="Study in the United Kingdom"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
                Study In The United Kingdom
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed text-balance">
                Experience centuries of academic excellence and rich heritage
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: BookOpen,
                    text: "Historic universities with global prestige",
                  },
                  {
                    icon: Clock,
                    text: "Shorter degree programs save time and costs",
                  },
                  { icon: Briefcase, text: "2-year post-study work visa" },
                  {
                    icon: Users,
                    text: "Multicultural and welcoming environment",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-lg text-white/95">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Application Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Begin Your Journey
                </h2>
                <p className="text-muted-foreground">
                  Fill in your details and we'll guide you through every step
                </p>
              </div>
              <StudyApplicationForm country="United Kingdom" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose The United Kingdom?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The UK combines centuries of academic tradition with modern
              innovation, offering world-renowned degrees recognized globally by
              employers and institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "World-Class Universities",
                desc: "Home to Oxford, Cambridge, and other top-ranked institutions",
              },
              {
                icon: Clock,
                title: "Shorter Programs",
                desc: "Complete your degree faster with 3-year undergrad and 1-year master's programs",
              },
              {
                icon: Briefcase,
                title: "Graduate Route Visa",
                desc: "Stay and work for 2 years after graduation to gain valuable experience",
              },
              {
                icon: Users,
                title: "Rich Cultural Heritage",
                desc: "Immerse yourself in history while enjoying a vibrant modern society",
              },
              {
                icon: BookOpen,
                title: "Research Excellence",
                desc: "Access world-leading research facilities and renowned faculty",
              },
              {
                icon: Building,
                title: "Central European Location",
                desc: "Easy access to explore Europe and build international connections",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {[
              { number: "150+", label: "Universities" },
              { number: "600K+", label: "International Students" },
              { number: "4", label: "Universities in Top 10 Globally" },
              { number: "2 Years", label: "Post-Study Work Rights" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
