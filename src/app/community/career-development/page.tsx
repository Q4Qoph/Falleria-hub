import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Briefcase, TrendingUp, Target } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Career Development Support | FHI Education",
  description: "Access internships, job placements, and career mentoring throughout your journey",
}

export default function CareerDevelopmentPage() {
  const benefits = [
    "Internship opportunities during studies",
    "Part-time job search assistance",
    "Resume and CV optimization",
    "LinkedIn profile building",
    "Interview preparation coaching",
    "Career counseling and planning",
    "Industry networking events",
    "Post-graduation job placement support",
  ]

  const features = [
    {
      icon: Briefcase,
      title: "Internships",
      description: "Access exclusive internship opportunities aligned with your field",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Long-term career planning and professional development",
    },
    {
      icon: Target,
      title: "Job Placement",
      description: "Support finding employment after graduation",
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
              alt="Career development"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Career Development Support</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Your education is an investment in your future. We support you beyond graduation with career counseling,
                internship opportunities, and job placement assistance to maximize your return.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Career Support</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">Career Services</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "During Studies",
                    desc: "Part-time job placement, on-campus employment, and internship opportunities that build your resume while you study",
                  },
                  {
                    title: "Professional Branding",
                    desc: "Resume optimization, LinkedIn profile building, and personal branding strategies to stand out in the job market",
                  },
                  {
                    title: "Networking Opportunities",
                    desc: "Industry events, career fairs, alumni connections, and professional networking to expand your opportunities",
                  },
                  {
                    title: "Post-Graduation Support",
                    desc: "Job search assistance, work visa guidance, and career counseling to help you launch your professional journey",
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
