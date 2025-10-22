import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-primary-light">Comprehensive support for every stage of your journey</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Career Counseling & Course Selection",
                  description:
                    "Our expert counselors work with you to identify your strengths, interests, and career goals. We help you explore various fields of study and recommend programs that align with your aspirations.",
                  features: ["Aptitude assessment", "Career path guidance", "Program recommendations", "Goal setting"],
                },
                {
                  title: "University Application & Admission Guidance",
                  description:
                    "We guide you through the entire application process, from selecting universities to preparing compelling essays and managing deadlines.",
                  features: [
                    "University selection",
                    "Essay writing support",
                    "Application management",
                    "Interview prep",
                  ],
                },
                {
                  title: "Visa Application Assistance",
                  description:
                    "Navigate the complex visa process with our experienced team. We ensure all documentation is complete and submitted correctly.",
                  features: ["Document preparation", "Visa consultation", "Interview coaching", "Status tracking"],
                },
                {
                  title: "Accommodation Support",
                  description:
                    "Finding suitable housing is crucial. We help you locate and secure accommodation near your university.",
                  features: ["Housing search", "Lease review", "Roommate matching", "Move-in support"],
                },
                {
                  title: "Document Preparation & Verification",
                  description:
                    "We assist with obtaining and verifying all required documents including transcripts, certificates, and reference letters.",
                  features: [
                    "Transcript requests",
                    "Certificate verification",
                    "Reference letters",
                    "Document translation",
                  ],
                },
                {
                  title: "Pre-Departure Briefing",
                  description:
                    "Before you leave, we prepare you for life abroad with comprehensive orientation covering culture, academics, and practical matters.",
                  features: ["Cultural orientation", "Academic preparation", "Practical guidance", "Peer networking"],
                },
              ].map((service, idx) => (
                <div key={idx} className="p-8 border border-border rounded-lg hover:shadow-lg transition">
                  <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
                  <p className="text-secondary mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Global Gateway?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Team",
                  description: "Our counselors have extensive experience in international education",
                },
                {
                  title: "Personalized Approach",
                  description: "We tailor our services to meet your unique needs and goals",
                },
                { title: "Proven Track Record", description: "98% of our students successfully gain admission" },
                { title: "Transparent Process", description: "Clear communication and no hidden fees" },
                { title: "24/7 Support", description: "Always available to answer your questions" },
                { title: "Affordable Services", description: "Competitive pricing with flexible payment options" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
