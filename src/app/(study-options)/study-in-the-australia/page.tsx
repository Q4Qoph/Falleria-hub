"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import StudyApplicationForm from "@/components/StudyApplicationForm"
import { GraduationCap, Sun, Users, Briefcase, TrendingUp, Heart } from "lucide-react"

export default function StudyInAustraliaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section with Overlay Form */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sunny-australian-university-campus-with-modern-arc.jpg"
            alt="Study in Australia"
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
                Study In Australia
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed text-balance">
                World-class education meets an unbeatable lifestyle
              </p>

              <div className="space-y-4">
                {[
                  { icon: GraduationCap, text: "7 universities in global top 100" },
                  { icon: Sun, text: "Incredible lifestyle and weather" },
                  { icon: Briefcase, text: "Post-study work rights for graduates" },
                  { icon: Users, text: "Friendly, safe, and welcoming culture" },
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
              <StudyApplicationForm country="Australia" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Australia?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Australia combines academic excellence with an enviable lifestyle. Study at world-ranked universities
              while enjoying beautiful beaches, vibrant cities, and a laid-back outdoor culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "Top-Ranked Universities",
                desc: "43 universities with 7 consistently in the global top 100",
              },
              {
                icon: Sun,
                title: "Outstanding Lifestyle",
                desc: "Beautiful weather, beaches, and outdoor activities year-round",
              },
              {
                icon: Briefcase,
                title: "Post-Study Work",
                desc: "Work visa for 2-4 years after graduation depending on your degree",
              },
              {
                icon: Users,
                title: "Multicultural Society",
                desc: "Welcoming community with students from 195+ countries",
              },
              {
                icon: TrendingUp,
                title: "Research Innovation",
                desc: "World-leading research in medicine, engineering, and environmental science",
              },
              {
                icon: Heart,
                title: "Safe Environment",
                desc: "Low crime rates and strong student support services",
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
              { number: "80+", label: "Universities" },
              { number: "700K+", label: "International Students" },
              { number: "7", label: "Universities in Top 100" },
              { number: "2-4 Years", label: "Post-Study Work Rights" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Footer />
    </main>
  )
}
