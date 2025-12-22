import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, FileText, Send, Shield } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Institution Application | FHI Education",
  description: "Complete application management and submission support for universities worldwide",
}

export default function InstitutionApplicationPage() {
  const benefits = [
    "Application strategy and timeline planning",
    "Document preparation and verification",
    "Statement of Purpose (SOP) review and editing",
    "Letter of Recommendation (LOR) guidance",
    "Application form completion assistance",
    "Multiple university applications management",
    "Application tracking and follow-up",
    "Response handling and decision support",
  ]

  const features = [
    {
      icon: FileText,
      title: "Document Excellence",
      description: "Professional review of all application documents to maximize your chances",
    },
    {
      icon: Send,
      title: "Timely Submissions",
      description: "Never miss a deadline with our organized application management system",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Multiple review stages to ensure error-free, compelling applications",
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
              src="/diverse-international-students-studying-together-i.jpg"
              alt="Application process"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Institution Application</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Navigate the complex university application process with confidence. We handle every detail from
                document preparation to final submission, ensuring your application stands out.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Complete Application Support</h2>

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

        {/* Documents Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Documents We Help With</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Academic Transcripts",
                    desc: "Proper formatting and verification of all academic records",
                  },
                  {
                    title: "Statement of Purpose",
                    desc: "Compelling essays that showcase your unique story and aspirations",
                  },
                  {
                    title: "Letters of Recommendation",
                    desc: "Guidance on obtaining strong, relevant recommendation letters",
                  },
                  {
                    title: "Resume/CV",
                    desc: "Academic CV formatting highlighting achievements and experiences",
                  },
                  {
                    title: "Test Scores",
                    desc: "IELTS, TOEFL, GRE, GMAT score reporting and submission",
                  },
                  {
                    title: "Portfolio",
                    desc: "For creative programs, we help showcase your best work",
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
