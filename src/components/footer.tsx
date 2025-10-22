import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Global Gateway</h3>
            <p className="text-primary-light text-sm">Your pathway to international education excellence.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="hover:text-accent transition">
                  Institutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-primary-light">
              Email: info@globalgateway.edu
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-primary-light pt-8 text-center text-sm text-primary-light">
          <p>&copy; 2025 Global Gateway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
