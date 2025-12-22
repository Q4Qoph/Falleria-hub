import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Plane, BookOpen, Home } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Pre-Departure Briefings | FHI Education",
  description: "Comprehensive pre-departure preparation to ensure a smooth transition to your new university",
}

export default function PreDeparturePage() {
  const benefits = [
    "Essential packing guidelines and checklists",
    "Travel arrangements and flight booking assistance",
    "Airport procedures and immigration guidance",
    "Accommodation setup and orientation",
    "Banking and financial setup abroad",
    "Mobile and communication services",
    "Health insurance and medical requirements",
    "Cultural adaptation and lifestyle tips",
    "Safety and emergency protocols",
    "First-week survival guide",
  ]

  const features = [
    {
      icon: Plane,
      title: "Travel Ready",
      description: "Everything you need to know before boarding your flight",
    },
    {
      icon: BookOpen,
      title: "Academic Prep",
      description: "Get ready for your first day at university with confidence",
    },
    {
      icon: Home,
      title: "Settling In",
      description: "Practical guidance for your first weeks in a new country",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/front-view-friends-checking-menu_23-2148212381.jpg"
              alt="Pre-departure preparation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Pre-Departure Briefings</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Prepare for your international education journey with comprehensive briefings covering everything from
                travel logistics to cultural adaptation. Start your adventure with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Complete Pre-Departure Support</h2>

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

        {/* Briefing Topics */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">What We Cover</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Travel & Immigration",
                    desc: "Flight booking, airport procedures, customs, and immigration requirements",
                  },
                  {
                    title: "Accommodation",
                    desc: "Housing options, booking, arrival arrangements, and settling in",
                  },
                  {
                    title: "Financial Setup",
                    desc: "Opening bank accounts, money transfers, budgeting, and managing expenses",
                  },
                  {
                    title: "Health & Insurance",
                    desc: "Health coverage, medical facilities, prescriptions, and wellness resources",
                  },
                  {
                    title: "Cultural Adaptation",
                    desc: "Local customs, etiquette, weather, clothing, and lifestyle adjustments",
                  },
                  {
                    title: "Academic Orientation",
                    desc: "Course registration, campus facilities, academic expectations, and resources",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
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
