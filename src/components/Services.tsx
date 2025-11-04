import {
  FileCheck,
  Globe2,
  HeadphonesIcon,
  Shield,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe2,
    title: "University Selection",
    description:
      "Personalized recommendations based on your profile, preferences, and career goals from our network of 500+ partner institutions.",
  },
  {
    icon: FileCheck,
    title: "Application Management",
    description:
      "Complete guidance through the application process with document preparation, review, and submission tracking.",
  },
  {
    icon: Shield,
    title: "Visa Assistance",
    description:
      "Expert support for visa applications with high approval rates. We guide you through every step of the documentation.",
  },
  {
    icon: UserCheck,
    title: "Profile Building",
    description:
      "Strengthen your application with expert advice on SOPs, LORs, and building a compelling academic profile.",
  },
  {
    icon: Wallet,
    title: "Financial Guidance",
    description:
      "Comprehensive support for scholarships, education loans, and financial planning for your education abroad.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Dedicated counselors available round the clock to answer your questions and provide continuous support.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Services for Your
            <span className="bg-linear-to-r from-primary to-tertiary bg-clip-text text-transparent" 
             style={{
                  backgroundImage:
                    "linear-gradient(135deg,#00BF48 0%, #1A0BF4  100%)",
                }}>
              {" "}
              Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From application to acceptance, we provide end-to-end support for
            your international education journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border hover:border-[#00BF48] hover:shadow-lg transition-all duration-200 bg-card"
            >
              <CardContent className="p-6">
                <div className="bg-green-50 p-3 rounded-lg w-fit mb-4">
                  <service.icon className="h-6 w-6 text-[#00BF48]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
