import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { HeadphonesIcon, Clock, MessageCircle, Users, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function SupportPage() {
  const benefits = [
    "24/7 dedicated counselor availability",
    "Multi-channel support (phone, email, chat)",
    "Emergency assistance services",
    "Academic progress monitoring",
    "Career guidance throughout your studies",
    "Alumni network access",
  ]

  const features = [
    {
      icon: Clock,
      title: "Round-the-Clock",
      description: "Our support team is available 24/7 to address your concerns and questions.",
    },
    {
      icon: MessageCircle,
      title: "Multi-Channel",
      description: "Reach us via phone, email, WhatsApp, or live chat - whatever works best for you.",
    },
    {
      icon: Shield,
      title: "Emergency Support",
      description: "Immediate assistance for urgent matters like medical emergencies or legal issues.",
    },
    {
      icon: Users,
      title: "Dedicated Counselor",
      description: "Your personal counselor stays with you throughout your entire journey.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/front-view-friends-checking-menu_23-2148212381.jpg"
            alt="24/7 Support"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <HeadphonesIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Always Here For You</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">24/7 Dedicated Support</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
                Round-the-clock assistance whenever you need us, wherever you are
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Always Available</h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive support throughout your entire education journey
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <HeadphonesIcon className="h-4 w-4 text-[#00BF48]" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How We Support You</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Multiple channels and services to ensure you're never alone
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border hover:border-[#00BF48] transition-colors">
                  <CardContent className="p-6">
                    <div className="bg-green-50 p-3 rounded-lg w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-[#00BF48]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Types Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">What We Help With</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Academic Support</h3>
                    <p className="text-lg text-muted-foreground">
                      Help with course selection, academic challenges, and connecting with tutors or study resources.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Administrative Guidance</h3>
                    <p className="text-lg text-muted-foreground">
                      Assistance with visa extensions, work permits, internships, and other administrative matters.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Personal Well-being</h3>
                    <p className="text-lg text-muted-foreground">
                      Support for homesickness, cultural adjustment, mental health resources, and social connections.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Career Services</h3>
                    <p className="text-lg text-muted-foreground">
                      Job search assistance, resume building, interview prep, and connecting with alumni in your field.
                    </p>
                  </div>
                </div>
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
