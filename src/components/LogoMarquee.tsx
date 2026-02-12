import { motion } from "framer-motion";
import { useState, useCallback } from "react";

const items = [
"Secure AI by Design", "Secure AI Ecosystem", "Secure GenAI Usage",
"Protect the Extended Network", "Data Center Security", "Device Security",
"OT Security", "5G Security", "Prevent Network Threats",
"Malware Analysis/Sandboxing", "Internet Security", "Intrusion Prevention (IPS)",
"Secure DNS Traffic", "Simplify Network Security Management",
"Network Security Platform", "Unified Management Experience",
"Protect Data & SaaS Applications", "Data Loss Prevention",
"Secure Access Service Edge", "Zero Trust Network Access",
"Cloud Secure Web Gateway", "SaaS Security (CASB)",
"Branch & SD-WAN", "Autonomous Digital Experience Management"];


function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LogoMarquee = () => {
  const [shuffled, setShuffled] = useState(() => shuffle(items));

  const handleLoopComplete = useCallback(() => {
    setShuffled(shuffle(items));
  }, []);

  const list = [...shuffled, ...shuffled];

  return (
    <section className="py-16 border-t border-b border-border/50 overflow-hidden">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-10">

        PALO ALTO NETWORK SECURITY SOLUTIONS
      </motion.p>
      <div className="relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              duration: 15,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
          onAnimationComplete={handleLoopComplete}
          style={{ willChange: "transform" }}>

          {list.map((item, i) =>
          <div
            key={`${item}-${i}`}
            className="inline-flex items-center justify-center mx-10 text-muted-foreground/40 text-lg font-semibold tracking-wide select-none">

              {item}
            </div>
          )}
        </motion.div>
      </div>
    </section>);

};

export default LogoMarquee;