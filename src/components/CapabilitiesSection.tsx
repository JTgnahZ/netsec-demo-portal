import { motion } from "framer-motion";
import { Shield, Eye, Server, Fingerprint, Brain, Network } from "lucide-react";

const capabilities = [
  {
    icon: Shield,
    title: "Advanced Threat Protection",
    description: "Multi-layered defense with real-time threat intelligence and automated response across your entire network perimeter.",
  },
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "24/7 visibility into network activity with anomaly detection and behavioral analytics powered by machine learning.",
  },
  {
    icon: Server,
    title: "Cloud-Native Security",
    description: "Seamlessly secure hybrid and multi-cloud environments with unified policy management and compliance automation.",
  },
  {
    icon: Fingerprint,
    title: "Zero-Trust Access",
    description: "Identity-first security framework that verifies every user, device, and connection before granting access.",
  },
  {
    icon: Brain,
    title: "AI-Driven Analytics",
    description: "Predictive security insights that identify vulnerabilities before they become breaches using advanced ML models.",
  },
  {
    icon: Network,
    title: "Network Segmentation",
    description: "Intelligent micro-segmentation that contains threats and prevents lateral movement across your infrastructure.",
  },
];

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4 block">
            Platform Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gradient-light mb-4">
            The complete security stack
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every capability you need to defend, detect, and respond — unified in one platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
