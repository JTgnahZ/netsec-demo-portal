import { motion } from "framer-motion";

const logos = [
  "Fortinet", "Palo Alto", "CrowdStrike", "Cisco", "Splunk",
  "Zscaler", "SentinelOne", "Cloudflare"
];

const LogoMarquee = () => {
  return (
    <section className="py-16 border-t border-b border-border/50 overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-10"
      >
        Trusted across the enterprise security ecosystem
      </motion.p>
      <div className="relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-10 text-muted-foreground/40 text-lg font-semibold tracking-wide select-none"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
