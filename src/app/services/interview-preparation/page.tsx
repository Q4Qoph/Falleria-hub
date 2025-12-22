import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, MessageSquare, Video, Users } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Interview & Test Preparation | FHI Education",
  description: "Expert coaching for admissions interviews and standardized tests",
}

export default function InterviewPreparationPage() {
  const benefits = [
    "Mock interview sessions with feedback",
    "Common interview questions preparation",
    "Body language and communication coaching",
    "IELTS, TOEFL, GRE, GMAT test strategies",
    "Time management techniques",
    "Practice tests and score analysis",
    "Confidence building exercises",
    "Video interview preparation",
  ]

  const features = [
    {
      icon: MessageSquare,
      title: "Interview Mastery",
      description: "Ace your admissions interviews with proven techniques",
    },
    {
      icon: Video,
      title: "Mock Sessions",
      description: "Realistic practice interviews with detailed feedback",
    },
    {
      icon: Users,
      title: "Test Expertise",
      description: "Achieve your target scores with strategic test prep",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/diverse-international-students-studying-together-i.jpg"
              alt="Interview preparation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Interview & Test Preparation</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Walk into your interviews and exams with confidence. Our comprehensive coaching program prepares you for
                every question, every scenario, and every challenge you'll face.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Complete Preparation Support</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">What We Cover</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Admissions Interviews",
                    desc: "Practice answering behavioral questions, articulating your goals, and presenting your unique story compellingly",
                  },
                  {
                    title: "English Proficiency Tests",
                    desc: "IELTS and TOEFL preparation covering all sections: reading, writing, listening, and speaking with score improvement strategies",
                  },
                  {
                    title: "Graduate Entrance Exams",
                    desc: "GRE, GMAT, and other graduate exam prep with focus on quantitative, verbal, and analytical writing sections",
                  },
                  {
                    title: "Presentation Skills",
                    desc: "Communication techniques, body language, voice modulation, and professional presence for in-person and video interviews",
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
