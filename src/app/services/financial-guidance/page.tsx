import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import { Wallet, DollarSign, Award, PiggyBank, Calculator } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function FinancialGuidancePage() {
  const benefits = [
    "Scholarship identification and application support",
    "Education loan assistance and comparison",
    "Budget planning for living and tuition costs",
    "Part-time work opportunity guidance",
    "Financial aid application support",
    "Currency exchange and banking guidance",
  ]

  const features = [
    {
      icon: Award,
      title: "Scholarships",
      description: "Identify and apply for merit-based and need-based scholarships to reduce costs.",
    },
    {
      icon: DollarSign,
      title: "Education Loans",
      description: "Compare loan options and assistance with application process for best rates.",
    },
    {
      icon: Calculator,
      title: "Budget Planning",
      description: "Create realistic budgets covering tuition, accommodation, food, and travel.",
    },
    {
      icon: PiggyBank,
      title: "Cost Optimization",
      description: "Tips and strategies to minimize expenses while studying abroad.",
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
            alt="Financial Guidance"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Wallet className="h-5 w-5" />
                <span className="text-sm font-medium">Make Education Affordable</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Financial Guidance & Planning</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
                Expert support for scholarships, loans, and budget planning to make your dream affordable
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">How We Help</h2>
                <p className="text-xl text-muted-foreground">Comprehensive financial planning and support services</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                      <Wallet className="h-4 w-4 text-[#00BF48]" />
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
                Making international education financially accessible
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
              <h2 className="text-4xl font-bold mb-12 text-center">Financial Planning Process</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Cost Assessment</h3>
                    <p className="text-lg text-muted-foreground">
                      Calculate total costs including tuition, living expenses, insurance, and travel for your chosen
                      destination.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Scholarship Search</h3>
                    <p className="text-lg text-muted-foreground">
                      Identify eligible scholarships and assist with applications to maximize funding opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Loan Assistance</h3>
                    <p className="text-lg text-muted-foreground">
                      Help you compare education loan options and guide through the application process.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00BF48] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ongoing Budget Support</h3>
                    <p className="text-lg text-muted-foreground">
                      Provide guidance on managing finances, finding part-time work, and optimizing expenses abroad.
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
