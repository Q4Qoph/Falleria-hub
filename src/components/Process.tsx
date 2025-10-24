import { CheckCircle2 } from "lucide-react";
import campusImage from "../assets/campus-life.jpg";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Schedule a call with our expert counselors to discuss your goals and preferences.",
  },
  {
    number: "02",
    title: "Profile Assessment",
    description: "We evaluate your academic background and recommend the best universities for you.",
  },
  {
    number: "03",
    title: "Application Preparation",
    description: "Our team helps you prepare all documents and craft compelling applications.",
  },
  {
    number: "04",
    title: "Submission & Tracking",
    description: "We submit your applications and provide real-time updates on your application status.",
  },
  {
    number: "05",
    title: "Visa & Pre-Departure",
    description: "Complete visa assistance and pre-departure orientation to prepare you for your journey.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <Image
              src={campusImage}
              alt="University campus with students"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
          </div>

          {/* Right: Process Steps */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple & Transparent
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Application Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We've streamlined the application process into 5 easy steps. Track your progress at every stage.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {step.title}
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
