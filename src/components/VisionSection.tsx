import { motion } from "framer-motion";
import { Cloud, Route, ShieldCheck, Globe, Brain, Atom } from "lucide-react";

const visionItems = [
  {
    icon: Cloud,
    title: "Strata Cloud Manager",
    subtitle: "Unified NetSec Platform",
  },
  {
    icon: Route,
    title: "SASE Journey",
    subtitle: "Day 0 to Day N",
  },
  {
    icon: ShieldCheck,
    title: "CLARA",
    subtitle: "Cloud Network and AI Risk Assessment",
  },
  {
    icon: Globe,
    title: "Secure AI Usage",
    subtitle: "with Prisma Browser",
  },
  {
    icon: Brain,
    title: "AI Transformation",
    subtitle: "Drive with Prisma AIRS",
  },
  {
    icon: Atom,
    title: "Quantum Resilience",
    subtitle: "Post-Quantum Cryptography",
  },
];

const DEMO_URL = "https://sasesensai.paloaltonetworks.com/EBC2026";

const VisionSection = () => {
  return (
    <section id="vision" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4 block">
            Vision Delivering
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient-light mb-4">
            How You'll Be Protected Tomorrow
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The roadmap innovations that will define the next generation of enterprise security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-card border border-border hover:glow-border transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-400/10 flex items-center justify-center mb-4 group-hover:bg-purple-400/20 transition-colors">
                <item.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.subtitle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
