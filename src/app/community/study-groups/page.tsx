import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, BookOpen, Users, Globe } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Country-Specific Study Groups | FHI Education",
  description: "Join cohorts of students heading to your destination for shared learning",
}

export default function StudyGroupsPage() {
  const benefits = [
    "Country-specific cohorts and groups",
    "University-specific communities",
    "Shared test preparation resources",
    "Group study sessions and workshops",
    "Cultural preparation together",
    "Language learning support groups",
    "Travel planning and coordination",
    "Shared accommodation searches",
  ]

  const features = [
    {
      icon: BookOpen,
      title: "Collaborative Learning",
      description: "Study together for IELTS, TOEFL, GRE, and other exams",
    },
    {
      icon: Users,
      title: "Destination Cohorts",
      description: "Groups organized by where you're heading and when",
    },
    {
      icon: Globe,
      title: "Cultural Exchange",
      description: "Learn about your destination from peers with firsthand experience",
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
              alt="Study groups"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Country-Specific Study Groups</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Learn together, grow together, succeed together. Join focused study groups with peers heading to the
                same destination and build your support system before you even depart.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Collaborative Learning Communities</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">Study Group Activities</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Test Preparation",
                    desc: "Join weekly study sessions for IELTS, TOEFL, GRE, GMAT, and SAT with shared resources and practice tests",
                  },
                  {
                    title: "Application Workshops",
                    desc: "Collaborative essay review, SOP feedback sessions, and application strategy discussions",
                  },
                  {
                    title: "Pre-Departure Prep",
                    desc: "Group sessions on cultural adaptation, packing tips, travel planning, and settling-in strategies",
                  },
                  {
                    title: "Language Practice",
                    desc: "English conversation practice and academic English preparation to boost confidence before departure",
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
