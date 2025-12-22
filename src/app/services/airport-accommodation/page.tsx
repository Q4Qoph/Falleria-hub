import Contact from "@/components/Contact"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CheckCircle2, Car, Home, MapPin } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Airport Pickup & Accommodation | FHI Education",
  description: "Hassle-free arrival with airport pickup and accommodation arrangement services",
}

export default function AirportAccommodationPage() {
  const benefits = [
    "Confirmed airport pickup on arrival",
    "Safe, reliable transportation to accommodation",
    "Meet and greet service at the airport",
    "Pre-arranged accommodation options",
    "Temporary and permanent housing solutions",
    "Campus proximity accommodation",
    "Shared and private room options",
    "Lease agreement assistance",
    "Safety and security verification",
    "Local area orientation",
  ]

  const features = [
    {
      icon: Car,
      title: "Airport Pickup",
      description: "Stress-free arrival with our trusted pickup service at the airport",
    },
    {
      icon: Home,
      title: "Accommodation",
      description: "Pre-vetted housing options near your university campus",
    },
    {
      icon: MapPin,
      title: "Local Guidance",
      description: "Neighborhood tours and essential services introduction",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/group-friends-planning-trip-cafe .jpg"
              alt="Airport and accommodation services"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Airport Pickup & Accommodation</h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Start your journey stress-free with our airport pickup and accommodation services. We ensure a smooth,
                safe arrival and comfortable housing arrangements near your university.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Arrival & Housing Made Easy</h2>

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

        {/* Services Detail */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">What's Included</h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Airport Reception",
                    desc: "Our representative will meet you at the arrivals gate with a welcome sign and assist with your luggage",
                  },
                  {
                    title: "Safe Transport",
                    desc: "Comfortable, reliable transportation directly to your pre-arranged accommodation",
                  },
                  {
                    title: "Housing Options",
                    desc: "Student residences, shared apartments, homestays, or private accommodations based on your preference and budget",
                  },
                  {
                    title: "Orientation Tour",
                    desc: "Introduction to your neighborhood, including grocery stores, pharmacies, public transport, and campus locations",
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

        {/* Contact Section */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
