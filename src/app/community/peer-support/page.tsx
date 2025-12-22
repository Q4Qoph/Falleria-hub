import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Users, MessageCircle, Heart } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Peer Support Network | FHI Education",
  description: "Connect with current students and fellow applicants on the same journey",
}

export default function PeerSupportPage() {
  const benefits = [
    "Connect with students at your target universities",
    "WhatsApp and Telegram community groups",
    "Monthly virtual meetups and networking events",
    "Share experiences and ask questions",
    "Cultural exchange and friendship building",
    "Study tips from current students",
    "Real insights about campus life",
    "Pre-departure buddy matching",
  ]

  const features = [
    {
      icon: Users,
      title: "Global Network",
      description: "10,000+ students across 50 countries supporting each other",
    },
    {
      icon: MessageCircle,
      title: "Active Communities",
      description: "Country and university-specific groups for targeted support",
    },
    {
      icon: Heart,
      title: "Lasting Friendships",
      description: "Build connections that last beyond your university years",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/study-group-african-people.jpg"
              alt="Peer support community"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Active Peer Support Network</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                You're not alone on this journey. Connect with thousands of students who understand exactly what you're
                going through and can offer real advice, support, and friendship.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Join Our Community</h2>

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
              <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Join Community Groups",
                    desc: "Get instant access to WhatsApp and Telegram groups organized by destination country and university",
                  },
                  {
                    title: "Connect with Current Students",
                    desc: "Chat with students already studying at your dream universities to learn about campus life, academics, and culture",
                  },
                  {
                    title: "Attend Virtual Events",
                    desc: "Monthly networking sessions, Q&A panels, and social events to build relationships and share experiences",
                  },
                  {
                    title: "Find Your Travel Buddy",
                    desc: "Match with peers heading to the same destination around the same time for shared travel and support",
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
