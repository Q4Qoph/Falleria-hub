import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, FileCheck, Globe, Shield } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Student Visa Application | FHI Education",
  description: "Expert student visa assistance with 98% success rate for all major study destinations",
}

export default function StudentVisaPage() {
  const benefits = [
    "Complete visa documentation checklist",
    "Application form completion assistance",
    "Financial documentation guidance",
    "Visa interview preparation and mock sessions",
    "Biometric and medical exam coordination",
    "Embassy liaison and follow-up",
    "Visa approval tracking",
    "Post-visa travel and entry guidance",
  ]

  const features = [
    {
      icon: Shield,
      title: "98% Success Rate",
      description: "Industry-leading visa approval rate across all destinations",
    },
    {
      icon: FileCheck,
      title: "Document Expertise",
      description: "Comprehensive review to ensure all requirements are perfectly met",
    },
    {
      icon: Globe,
      title: "All Countries",
      description: "Visa support for USA, UK, Canada, Australia, and all major destinations",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/dashboard-hero.jpg" alt="Visa application support" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Student Visa Application</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Navigate the complex visa process with confidence. Our expert team has helped thousands of students
                secure their visas with our proven 98% success rate.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Visa Support</h2>

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

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Our Visa Process</h2>

              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Document Collection",
                    desc: "Complete checklist of required documents specific to your destination country",
                  },
                  {
                    step: "02",
                    title: "Application Preparation",
                    desc: "Careful completion of visa forms with accurate, consistent information",
                  },
                  {
                    step: "03",
                    title: "Interview Preparation",
                    desc: "Mock interviews and coaching to ensure confidence and success",
                  },
                  {
                    step: "04",
                    title: "Submission & Follow-up",
                    desc: "Application submission and continuous tracking until approval",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="text-5xl font-bold text-[#00BF48]/20">{item.step}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-lg">{item.desc}</p>
                    </div>
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
