"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import Image from "next/image"
import { BookOpen, Target, TrendingUp, Users, CheckCircle2, Award } from "lucide-react"

export default function CourseCounsellingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mentor-helping-student-with-university-application.jpg"
            alt="Course Counselling"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="text-sm font-semibold">Expert Guidance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Course Counselling</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto text-balance">
              Find the perfect course that aligns with your passion, goals, and future career aspirations
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Personalized Course Selection</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our experienced counselors work one-on-one with you to identify the best courses and programs based on
              your academic background, interests, and career objectives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Career Path Alignment",
                desc: "Match your course selection with your long-term career goals and industry trends",
              },
              {
                icon: BookOpen,
                title: "Program Deep-Dive",
                desc: "Detailed analysis of curriculum, specializations, and learning outcomes",
              },
              {
                icon: Users,
                title: "University Matching",
                desc: "Find institutions that best fit your profile and preferences",
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                desc: "Latest industry trends and job market analysis for informed decisions",
              },
              {
                icon: Award,
                title: "Scholarship Options",
                desc: "Identify funding opportunities and scholarship programs",
              },
              {
                icon: CheckCircle2,
                title: "Entry Requirements",
                desc: "Clear guidance on prerequisites and admission criteria",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-neutral-100"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Counselling Process</h2>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Initial Assessment",
                  desc: "We evaluate your academic background, interests, and career aspirations",
                },
                {
                  step: "02",
                  title: "Course Research",
                  desc: "Our team researches programs that match your profile across 500+ universities",
                },
                {
                  step: "03",
                  title: "Personalized Recommendations",
                  desc: "Receive tailored course and university recommendations with detailed insights",
                },
                {
                  step: "04",
                  title: "Decision Support",
                  desc: "We help you compare options and make the final decision with confidence",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200 flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { number: "10,000+", label: "Students Counseled" },
              { number: "500+", label: "Partner Universities" },
              { number: "50+", label: "Study Destinations" },
              { number: "95%", label: "Satisfaction Rate" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      <Footer />
    </main>
  )
}
