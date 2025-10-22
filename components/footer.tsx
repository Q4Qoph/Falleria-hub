import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Global Gateway</h3>
            <p className="text-neutral-400">Your trusted partner in achieving international education excellence.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition">
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition">
                  University Applications
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition">
                  Visa Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-white transition">
                  Document Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Email: info@globalgateway.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Education St, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">© 2025 Global Gateway. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-neutral-400 hover:text-white transition text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
