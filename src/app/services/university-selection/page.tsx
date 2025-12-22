import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { Globe2, GraduationCap, Target, TrendingUp, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function UniversitySelectionPage() {
  const benefits = [
    "Access to 500+ partner institutions worldwide",
    "Personalized university matching based on your profile",
    "Expert insights on program rankings and reputation",
    "Career outcome analysis for each program",
    "Application success rate data",
    "Scholarship opportunities identification",
  ]

  const features = [
    {
      icon: Target,
      title: "Profile Analysis",
      description:
        "We assess your academic background, test scores, work experience, and career goals to identify the best-fit universities.",
    },
    {
      icon: TrendingUp,
      title: "Career Alignment",
      description:
        "Recommendations based on post-graduation outcomes, industry connections, and career advancement opportunities.",
    },
    {
      icon: Users,
      title: "Personal Preferences",
      description:
        "Consider location preferences, campus culture, class size, and lifestyle factors that matter to you.",
    },
    {
      icon: Award,
      title: "Financial Fit",
      description: "Match you with universities offering scholarships, assistantships, and affordable tuition options.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/diverse-international-students-studying-together-i.jpg"
            alt="University Selection"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Globe2 className="h-5 w-5" />
                <span className="text-sm font-medium">500+ Partner Universities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Find Your Perfect University Match</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
                Data-driven university selection tailored to your profile, goals, and aspirations
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">What You Get</h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive university selection support designed for success
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <GraduationCap className="h-4 w-4 text-[#00BF48]" />
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
              <h2 className="text-4xl font-bold mb-4">Our Selection Process</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A comprehensive approach to finding universities that align with your goals
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
              <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Initial Consultation</h3>
                    <p className="text-lg text-muted-foreground">
                      We discuss your academic background, career goals, budget, and preferences in detail.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Profile Evaluation</h3>
                    <p className="text-lg text-muted-foreground">
                      Our experts analyze your profile strength and identify universities where you'll be competitive.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Curated Shortlist</h3>
                    <p className="text-lg text-muted-foreground">
                      Receive a personalized list of universities categorized as reach, target, and safe schools.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Final Selection</h3>
                    <p className="text-lg text-muted-foreground">
                      Make informed decisions with detailed program information, campus insights, and application
                      strategies.
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
