import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Global Gateway</h1>
            <p className="text-lg text-primary-light">
              Empowering students to achieve their international education dreams
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  To provide comprehensive, transparent, and personalized guidance to students seeking international
                  education opportunities, ensuring they make informed decisions and achieve their academic and career
                  aspirations.
                </p>
                <p className="text-secondary leading-relaxed">
                  We believe that quality education should be accessible to all, and we're committed to removing
                  barriers and simplifying the application process.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-secondary leading-relaxed mb-4">
                  To become the most trusted international education agency, recognized for our integrity, expertise,
                  and student-centric approach.
                </p>
                <p className="text-secondary leading-relaxed">
                  We envision a world where geographical boundaries don't limit educational opportunities, and every
                  student has access to world-class institutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    year: "2015",
                    title: "Founded",
                    description: "Global Gateway was established with a vision to transform international education.",
                  },
                  {
                    year: "2017",
                    title: "Expansion",
                    description: "Expanded partnerships with 50+ universities across 15 countries.",
                  },
                  {
                    year: "2019",
                    title: "Digital Platform",
                    description: "Launched our comprehensive online platform for seamless applications.",
                  },
                  {
                    year: "2023",
                    title: "Milestone",
                    description: "Successfully placed over 5,000 students in international institutions.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {item.year}
                      </div>
                      {idx < 3 && <div className="w-1 h-16 bg-border mt-2" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Dr. Priya Sharma", role: "Founder & CEO", bio: "20+ years in international education" },
                { name: "James Wilson", role: "Head of Admissions", bio: "Former university admissions director" },
                { name: "Lisa Chen", role: "Student Success Manager", bio: "Dedicated to student outcomes" },
              ].map((member, idx) => (
                <div key={idx} className="text-center p-6 border border-border rounded-lg">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-secondary text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "5000+", label: "Students Placed" },
                { number: "150+", label: "Partner Universities" },
                { number: "50+", label: "Countries Served" },
                { number: "98%", label: "Success Rate" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <p className="text-primary-light">{stat.label}</p>
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
