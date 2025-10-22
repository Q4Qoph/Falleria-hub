import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Your Gateway to Global Education</h1>
              <p className="text-lg md:text-xl text-primary-light mb-8 text-balance">
                Connect with top international universities and achieve your dreams of studying abroad with expert
                guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="btn-primary text-center">
                  Start Your Application
                </Link>
                <Link href="/about" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Services</h2>
            <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
              Comprehensive support for every stage of your international education journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Career Counseling",
                  description:
                    "Personalized guidance to identify the right career path and educational programs for your goals.",
                  icon: "🎯",
                },
                {
                  title: "University Applications",
                  description:
                    "Expert assistance with application preparation, essay writing, and submission to top institutions.",
                  icon: "📚",
                },
                {
                  title: "Visa & Immigration",
                  description: "Complete support with visa applications, documentation, and immigration requirements.",
                  icon: "✈️",
                },
                {
                  title: "Accommodation Support",
                  description: "Help finding and securing suitable housing near your chosen university.",
                  icon: "🏠",
                },
                {
                  title: "Document Preparation",
                  description: "Assistance with transcripts, certificates, and other required documentation.",
                  icon: "📄",
                },
                {
                  title: "Pre-Departure Briefing",
                  description: "Comprehensive orientation to prepare you for life and studies abroad.",
                  icon: "🌍",
                },
              ].map((service, idx) => (
                <div key={idx} className="p-6 border border-border rounded-lg hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-secondary">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Create Account", description: "Sign up and complete your profile" },
                {
                  step: "2",
                  title: "Submit Application",
                  description: "Fill out the application form with your details",
                },
                { step: "3", title: "Track Progress", description: "Monitor your application status in real-time" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Student Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Ahmed",
                  university: "University of Cambridge",
                  quote:
                    "Global Gateway made my dream of studying at Cambridge a reality. Their guidance was invaluable!",
                },
                {
                  name: "James Chen",
                  university: "MIT",
                  quote:
                    "The application process was seamless. The team was always there to help and answer my questions.",
                },
                {
                  name: "Maria Garcia",
                  university: "University of Toronto",
                  quote: "I felt supported every step of the way. Highly recommend their services to anyone!",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-neutral-50 rounded-lg border border-border">
                  <p className="text-secondary mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-secondary">{testimonial.university}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-primary-light mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have successfully studied abroad with our guidance.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-primary hover:bg-neutral-100 px-8 py-3 rounded-lg font-semibold transition"
            >
              Apply Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
