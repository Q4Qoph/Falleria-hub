import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Target, Calendar, BarChart } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Strategic Application Planning | FHI Education",
  description: "Data-driven application strategies to maximize your chances of acceptance",
}

export default function ApplicationPlanningPage() {
  const benefits = [
    "University shortlisting based on your profile",
    "Application timeline and deadline management",
    "Reach, match, and safety school strategy",
    "Program-specific application requirements",
    "Early action vs regular decision guidance",
    "Multiple country application strategies",
    "Scholarship and funding opportunities",
    "Backup plan and contingency strategies",
  ]

  const features = [
    {
      icon: Target,
      title: "Strategic Selection",
      description: "Choose universities where your profile shines brightest",
    },
    {
      icon: Calendar,
      title: "Timeline Mastery",
      description: "Never miss a deadline with our organized planning system",
    },
    {
      icon: BarChart,
      title: "Data-Driven",
      description: "Decisions based on acceptance rates, trends, and success patterns",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/group-friends-planning-trip-cafe .jpg"
              alt="Application planning"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Strategic Application Planning</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Maximize your chances of acceptance with data-driven strategies. Our expert counselors analyze thousands
                of data points to create your personalized application roadmap.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Strategic Approach to Success</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">Our Planning Process</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Profile Analysis",
                    desc: "Comprehensive evaluation of your academic credentials, test scores, extracurriculars, and unique qualities",
                  },
                  {
                    title: "University Matching",
                    desc: "Identification of universities where your profile aligns with admission criteria and institutional values",
                  },
                  {
                    title: "Application Mix",
                    desc: "Balanced portfolio of reach, target, and safety schools across multiple countries and programs",
                  },
                  {
                    title: "Execution Timeline",
                    desc: "Detailed schedule covering tests, applications, essays, recommendations, and all critical deadlines",
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
