import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, FileCheck, Shield, Globe } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "End-to-End Visa Support | FHI Education",
  description: "98% visa success rate with comprehensive documentation and interview preparation",
}

export default function VisaSupportPage() {
  const benefits = [
    "98% visa approval success rate",
    "Complete documentation checklist",
    "Financial documentation guidance",
    "Visa interview preparation",
    "Embassy appointment scheduling",
    "Form completion assistance",
    "Document verification and review",
    "Post-approval travel guidance",
  ]

  const features = [
    {
      icon: Shield,
      title: "Proven Success",
      description: "Industry-leading 98% visa approval rate across all destinations",
    },
    {
      icon: FileCheck,
      title: "Thorough Review",
      description: "Multiple verification stages to ensure perfect applications",
    },
    {
      icon: Globe,
      title: "All Countries",
      description: "Expert support for visas to every major study destination",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/dashboard-hero.jpg" alt="Visa support services" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">End-to-End Visa Support</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Secure your student visa with confidence. Our comprehensive support and 98% success rate ensure you're
                fully prepared for every step of the visa application process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Visa Assistance</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">Our Visa Process</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Document Preparation",
                    desc: "Complete guidance on gathering all required documents including financial statements, acceptance letters, and supporting materials",
                  },
                  {
                    title: "Application Review",
                    desc: "Thorough verification of all forms and documents to eliminate errors and ensure compliance with embassy requirements",
                  },
                  {
                    title: "Interview Coaching",
                    desc: "Mock interview sessions covering common questions, proper responses, and confidence-building techniques",
                  },
                  {
                    title: "Submission & Follow-up",
                    desc: "Application submission assistance, appointment scheduling, and continuous tracking until visa approval",
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
