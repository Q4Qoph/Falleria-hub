"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getDashboardLink = () => {
    if (!isAuthenticated) return null
    return user?.role === "admin" ? "/admin/dashboard" : "/student/dashboard"
  }

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">Global Gateway</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-secondary hover:text-foreground transition">
            Home
          </Link>
          <Link href="/about" className="text-secondary hover:text-foreground transition">
            About
          </Link>
          <Link href="/services" className="text-secondary hover:text-foreground transition">
            Services
          </Link>
          <Link href="/institutions" className="text-secondary hover:text-foreground transition">
            Institutions
          </Link>
          <Link href="/contact" className="text-secondary hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href={getDashboardLink() || "/"} className="text-secondary hover:text-foreground transition">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-secondary hover:text-foreground transition hidden sm:inline">
                Login
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Apply Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-neutral-50">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link href="/" className="text-secondary hover:text-foreground">
              Home
            </Link>
            <Link href="/about" className="text-secondary hover:text-foreground">
              About
            </Link>
            <Link href="/services" className="text-secondary hover:text-foreground">
              Services
            </Link>
            <Link href="/institutions" className="text-secondary hover:text-foreground">
              Institutions
            </Link>
            <Link href="/contact" className="text-secondary hover:text-foreground">
              Contact
            </Link>
            {!isAuthenticated && (
              <Link href="/login" className="text-secondary hover:text-foreground">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
