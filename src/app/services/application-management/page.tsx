import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { FileCheck, FileText, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function ApplicationManagementPage() {
  const benefits = [
    "End-to-end application process management",
    "Document preparation and review services",
    "Application timeline tracking and reminders",
    "Essay and SOP editing by experts",
    "Quality checks before submission",
    "Multiple university applications handled simultaneously",
  ]

  const features = [
    {
      icon: FileText,
      title: "Document Preparation",
      description: "Expert help in preparing transcripts, SOPs, LORs, resumes, and all required documents.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Multiple review rounds to ensure your application is error-free and compelling.",
    },
    {
      icon: Clock,
      title: "Timeline Management",
      description: "Stay on track with deadlines through our organized tracking system and reminders.",
    },
    {
      icon: TrendingUp,
      title: "Application Strategy",
      description: "Strategic advice on positioning your profile to maximize admission chances.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/mentor-helping-student-with-university-application.jpg"
            alt="Application Management"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FileCheck className="h-5 w-5" />
                <span className="text-sm font-medium">Complete Application Support</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Stress-Free Application Management</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
                Let our experts handle your applications while you focus on your studies
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">What We Handle</h2>
                <p className="text-xl text-muted-foreground">Comprehensive application support from start to finish</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <CheckCircle className="h-4 w-4 text-[#00BF48]" />
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
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every aspect of your application handled with care and expertise
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
              <h2 className="text-4xl font-bold mb-12 text-center">Application Process</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Document Collection</h3>
                    <p className="text-lg text-muted-foreground">
                      We gather all necessary documents including transcripts, test scores, and certificates.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Application Strategy</h3>
                    <p className="text-lg text-muted-foreground">
                      Develop a comprehensive strategy for each university application highlighting your strengths.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Review & Refinement</h3>
                    <p className="text-lg text-muted-foreground">
                      Multiple rounds of review to polish essays, SOPs, and ensure all requirements are met.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Submission & Tracking</h3>
                    <p className="text-lg text-muted-foreground">
                      Submit applications on time and track their status until you receive admission decisions.
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
