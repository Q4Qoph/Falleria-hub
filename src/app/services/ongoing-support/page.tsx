import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, HeadphonesIcon, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Ongoing Support | FHI Education",
  description: "24/7 continuous support throughout your international education journey",
}

export default function OngoingSupportPage() {
  const benefits = [
    "24/7 emergency assistance hotline",
    "Academic guidance and course selection help",
    "Accommodation and relocation support",
    "Part-time job and internship guidance",
    "Immigration and visa extension assistance",
    "Mental health and wellness support",
    "Family visit and travel coordination",
    "Graduate pathway and career counseling",
  ]

  const features = [
    {
      icon: HeadphonesIcon,
      title: "24/7 Availability",
      description: "Round-the-clock support whenever you need assistance",
    },
    {
      icon: MessageCircle,
      title: "Multiple Channels",
      description: "Reach us via phone, email, WhatsApp, or video call",
    },
    {
      icon: Heart,
      title: "Personal Care",
      description: "Dedicated counselor who knows your journey and goals",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/study-group-african-people.jpg" alt="Ongoing support" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Ongoing Support</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Your journey doesn't end when you land. We provide continuous support throughout your studies, ensuring
                you thrive academically, socially, and personally in your new environment.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">We're Always Here For You</h2>

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

        {/* Support Areas */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">How We Support You</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Academic Support",
                    desc: "Course selection, professor interactions, study strategies, and academic performance guidance",
                  },
                  {
                    title: "Immigration Matters",
                    desc: "Visa extensions, work permits, travel documents, and compliance with regulations",
                  },
                  {
                    title: "Career Development",
                    desc: "Internships, part-time work, networking events, and post-graduation planning",
                  },
                  {
                    title: "Personal Well-being",
                    desc: "Mental health resources, cultural adjustment support, and emergency assistance",
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

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
