import { motion } from "framer-motion";
import { Cloud, Route, ShieldCheck, Globe, Brain, Atom } from "lucide-react";

const valueItems = [
  {
    icon: Cloud,
    title: "Strata Cloud Manager",
    subtitle: "Unified NetSec Platform",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/scm",
  },
  {
    icon: Route,
    title: "SASE Journey",
    subtitle: "Day 0 to Day N",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/sase",
  },
  {
    icon: ShieldCheck,
    title: "CLARA",
    subtitle: "Cloud Network and AI Risk Assessment",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/clara",
  },
  {
    icon: Globe,
    title: "Secure AI Usage",
    subtitle: "with Prisma Browser",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/pb",
  },
  {
    icon: Brain,
    title: "AI Transformation",
    subtitle: "Drive with Prisma AIRS",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/airs",
  },
  {
    icon: Atom,
    title: "Quantum Resilience",
    subtitle: "Post-Quantum Cryptography",
    url: "https://sasesensai.paloaltonetworks.com/EBC2026/value/quantum",
  },
];

const IFRAME_URL = "https://reachsuite.app/go/exp-f8505ef2";

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
          className="text-center mb-12"
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

        {/* Main iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full rounded-2xl overflow-hidden border border-border bg-card mb-10"
        >
          <iframe
            src={IFRAME_URL}
            title="Value Stats"
            className="w-full h-[500px] sm:h-[600px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* Smaller demo cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {valueItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center justify-center text-center p-4 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center mb-2 group-hover:bg-sky-400/20 transition-colors">
                <item.icon className="w-4.5 h-4.5 text-sky-400" />
              </div>
              <h3 className="text-xs font-semibold text-foreground leading-tight mb-0.5">{item.title}</h3>
              <p className="text-[10px] text-muted-foreground leading-tight">{item.subtitle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
