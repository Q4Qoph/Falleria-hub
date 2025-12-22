import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Award, TrendingUp, Target } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Personalized Profile Building | FHI Education",
  description: "Build a compelling academic profile that stands out to top universities worldwide",
}

export default function ProfileBuildingPage() {
  const benefits = [
    "Comprehensive academic profile assessment",
    "Identification of strengths and improvement areas",
    "Extracurricular activity recommendations",
    "Leadership and volunteer opportunity guidance",
    "Research and internship placement support",
    "Standardized test preparation strategy",
    "Timeline planning for profile enhancement",
    "Competitive positioning analysis",
  ]

  const features = [
    {
      icon: Award,
      title: "Stand Out",
      description: "Build a profile that distinguishes you from thousands of applicants",
    },
    {
      icon: TrendingUp,
      title: "Strategic Growth",
      description: "Develop your profile systematically over time for maximum impact",
    },
    {
      icon: Target,
      title: "Goal-Aligned",
      description: "Every enhancement aligns with your target universities and programs",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/mentor-helping-student-with-university-application.jpg"
              alt="Profile building counseling"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Personalized Profile Building</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Transform your academic journey into a compelling story. We help you identify, develop, and showcase the
                unique qualities that make you an exceptional candidate for top universities.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Profile Assessment</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00BF48] shrink-0 mt-0.5" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-green-50 p-4 rounded-full w-fit mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-[#00BF48]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">What We Build Together</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Academic Excellence",
                    desc: "Course selection strategies, grade improvement plans, and advanced coursework recommendations to showcase intellectual curiosity",
                  },
                  {
                    title: "Extracurricular Impact",
                    desc: "Meaningful activities that demonstrate leadership, passion, and long-term commitment beyond academics",
                  },
                  {
                    title: "Research & Projects",
                    desc: "Guidance on research opportunities, independent projects, and competitions that align with your field of interest",
                  },
                  {
                    title: "Test Preparation",
                    desc: "Strategic approach to IELTS, TOEFL, GRE, GMAT, SAT, and other standardized tests based on target universities",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-lg">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  )
}
