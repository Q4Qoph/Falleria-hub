import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { Shield, FileText, CheckCircle, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function VisaAssistancePage() {
  const benefits = [
    "98% visa approval success rate",
    "Country-specific visa documentation support",
    "Interview preparation and mock sessions",
    "Application form filling assistance",
    "Financial documentation guidance",
    "Post-approval visa stamping support",
  ]

  const features = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Complete assistance in preparing and organizing all required visa documents.",
    },
    {
      icon: Users,
      title: "Interview Prep",
      description: "Mock interviews and coaching to help you confidently face visa officers.",
    },
    {
      icon: CheckCircle,
      title: "Application Review",
      description: "Thorough review of your visa application to minimize rejection risks.",
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Insights from counselors with years of visa application experience.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/group-friends-planning-trip-cafe .jpg"
            alt="Visa Assistance"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">98% Success Rate</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Expert Visa Assistance</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
                Navigate the visa process with confidence and maximize your approval chances
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Why Choose Our Visa Services</h2>
                <p className="text-xl text-muted-foreground">Proven track record of successful visa applications</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <Shield className="h-4 w-4 text-[#00BF48]" />
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
              <h2 className="text-4xl font-bold mb-4">What We Provide</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive visa support tailored to your destination country
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

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Visa Application Process</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Document Checklist</h3>
                    <p className="text-lg text-muted-foreground">
                      Receive a comprehensive checklist of all documents required for your specific visa type.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Application Preparation</h3>
                    <p className="text-lg text-muted-foreground">
                      Expert help in filling forms accurately and preparing supporting documents.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Interview Training</h3>
                    <p className="text-lg text-muted-foreground">
                      Mock interviews and guidance on common questions to prepare you thoroughly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Post-Approval Support</h3>
                    <p className="text-lg text-muted-foreground">
                      Continued support for visa stamping, travel arrangements, and final preparations.
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
