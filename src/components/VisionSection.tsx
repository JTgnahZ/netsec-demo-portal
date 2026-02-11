import { motion } from "framer-motion";
import { Rocket, Cpu, Globe, Layers } from "lucide-react";

const visionItems = [
  {
    icon: Cpu,
    title: "AI-First Security Operations",
    description: "Next-gen SOC automation where AI agents triage, investigate, and remediate threats autonomously — reducing analyst fatigue by 80%.",
  },
  {
    icon: Globe,
    title: "Universal SASE Framework",
    description: "Converged networking and security delivered from the edge, securing every user, branch, and cloud workload with a single architecture.",
  },
  {
    icon: Layers,
    title: "Composable Security Mesh",
    description: "Modular, API-first security services that integrate into any tech stack — from legacy data centers to serverless microservices.",
  },
  {
    icon: Rocket,
    title: "Predictive Cyber Defense",
    description: "Moving from reactive to proactive with threat prediction models that anticipate attack vectors weeks before exploitation.",
  },
];

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
            Where we're headed
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The roadmap innovations that will define the next generation of enterprise security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {visionItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex gap-5 p-6 rounded-2xl bg-card border border-border hover:glow-border transition-all duration-300"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
