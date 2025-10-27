import { Award, Clock, TrendingUp, Users } from "lucide-react";
import studyGroupImage from "../assets/study-group.jpg";
import Image from "next/image";

const benefits = [
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Trusted expertise in international education placement",
  },
  {
    icon: Users,
    title: "Expert Counselors",
    description: "Dedicated team of certified education consultants",
  },
  {
    icon: TrendingUp,
    title: "98% Success Rate",
    description: "Industry-leading acceptance and visa approval rates",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick turnaround times for all your applications",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent block">
                EduGlobal
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're not just another education consultancy. We're your partners
              in achieving your academic dreams with personalized guidance and
              proven success.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-200 hover:shadow-md"
                >
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-first lg:order-last">
            <Image
              src={studyGroupImage}
              alt="Students studying together"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
