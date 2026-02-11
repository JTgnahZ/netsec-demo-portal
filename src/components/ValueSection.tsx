import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, ShieldCheck } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "92%",
    label: "Threat Detection Rate",
    description: "Industry-leading accuracy in identifying and classifying network threats in real time.",
  },
  {
    icon: Clock,
    value: "<3 min",
    label: "Mean Time to Respond",
    description: "Automated playbooks reduce response times from hours to minutes across all incident types.",
  },
  {
    icon: DollarSign,
    value: "4.2x",
    label: "ROI in Year One",
    description: "Reduced breach costs, lower staffing needs, and eliminated tool sprawl drive measurable returns.",
  },
  {
    icon: ShieldCheck,
    value: "99.99%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability with geo-redundant infrastructure and zero-downtime deployments.",
  },
];

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
            Outcomes that matter
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quantifiable results from organizations that have deployed our security platform at scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border text-center group hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-extrabold text-gradient-primary mb-1">{metric.value}</div>
              <div className="text-sm font-semibold text-foreground mb-2">{metric.label}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
