"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function Institutions() {
  const [selectedCountry, setSelectedCountry] = useState("all")

  const institutions = [
    { name: "University of Cambridge", country: "UK", courses: "Engineering, Business, Medicine", ranking: "#2" },
    { name: "MIT", country: "USA", courses: "Technology, Engineering, Science", ranking: "#1" },
    { name: "University of Toronto", country: "Canada", courses: "Business, Engineering, Arts", ranking: "#20" },
    { name: "University of Melbourne", country: "Australia", courses: "Medicine, Law, Engineering", ranking: "#37" },
    {
      name: "National University of Singapore",
      country: "Singapore",
      courses: "Business, Engineering, Science",
      ranking: "#11",
    },
    { name: "University of Tokyo", country: "Japan", courses: "Engineering, Science, Business", ranking: "#39" },
    { name: "ETH Zurich", country: "Switzerland", courses: "Engineering, Science, Technology", ranking: "#8" },
    { name: "University of Amsterdam", country: "Netherlands", courses: "Business, Law, Engineering", ranking: "#50" },
  ]

  const countries = ["all", "UK", "USA", "Canada", "Australia", "Singapore", "Japan", "Switzerland", "Netherlands"]

  const filtered = selectedCountry === "all" ? institutions : institutions.filter((i) => i.country === selectedCountry)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner Institutions</h1>
            <p className="text-lg text-primary-light">Explore our network of world-class universities</p>
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            {/* Filter Buttons */}
            <div className="mb-12 flex flex-wrap gap-2 justify-center">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedCountry === country
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-foreground hover:bg-neutral-200"
                  }`}
                >
                  {country === "all" ? "All Countries" : country}
                </button>
              ))}
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((institution, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-border rounded-lg hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{institution.name}</h3>
                      <p className="text-primary font-semibold">{institution.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{institution.ranking}</p>
                      <p className="text-xs text-secondary">World Ranking</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-secondary font-semibold mb-2">Popular Courses:</p>
                    <p className="text-sm text-foreground">{institution.courses}</p>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition font-semibold">
                    Learn More
                  </button>
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
