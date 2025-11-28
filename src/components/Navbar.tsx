import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    } else {
      // fallback: navigate to home if the section doesn't exist
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Why Us
            </button>
            <Button
              variant="default"
              size="default"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent rounded-md transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Why Us
            </button>
            <div className="px-4">
              <Button
                variant="default"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
