"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import StudyApplicationForm from "@/components/StudyApplicationForm"
import { Globe, Briefcase, Award, TrendingUp, Factory, BadgeEuro } from "lucide-react"

export default function StudyInGermanyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section with Overlay Form */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-german-university-campus-heidelberg-munich.jpg"
            alt="Study in Germany"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
                Study In Germany
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed text-balance">
                World-class education with little to no tuition fees
              </p>

              <div className="space-y-4">
                {[
                  { icon: BadgeEuro, text: "Free or low-cost tuition fees" },
                  { icon: Factory, text: "Engineering and technology excellence" },
                  { icon: Briefcase, text: "Strong industry connections" },
                  { icon: Globe, text: "Heart of Europe" },
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
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Begin Your Journey</h2>
                <p className="text-muted-foreground">Fill in your details and we'll guide you through every step</p>
              </div>
              <StudyApplicationForm country="Germany" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Germany?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Germany combines academic excellence with affordability, offering world-renowned education in engineering,
              science, and technology with minimal tuition fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BadgeEuro,
                title: "Affordable Education",
                desc: "Most public universities charge no tuition fees for international students",
              },
              {
                icon: Factory,
                title: "Industry Leader",
                desc: "Home to global companies like BMW, Siemens, and Volkswagen",
              },
              {
                icon: TrendingUp,
                title: "Research Excellence",
                desc: "Cutting-edge research facilities and numerous Nobel Prize winners",
              },
              {
                icon: Briefcase,
                title: "Job Opportunities",
                desc: "18-month job-seeking visa after graduation",
              },
              {
                icon: Globe,
                title: "Central Location",
                desc: "Easy access to travel across Europe",
              },
              {
                icon: Award,
                title: "Top Rankings",
                desc: "Multiple universities in global top 100",
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
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
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
              { number: "400+", label: "Higher Education Institutions" },
              { number: "400K+", label: "International Students" },
              { number: "Top 5", label: "Global Rankings" },
              { number: "€0", label: "Tuition at Public Universities" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
