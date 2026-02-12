import { motion } from "framer-motion";
import { Cloud, Route, ShieldCheck, Globe, Brain, Atom } from "lucide-react";

const valueItems = [
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

const ValueSection = () => {
  return (
    <section id="value" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4 block">
            Value Delivered
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient-light mb-4">
            How You're Protected Today
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quantifiable results from organizations that have deployed our security platform at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueItems.map((item, i) => (
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
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
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

export default ValueSection;
