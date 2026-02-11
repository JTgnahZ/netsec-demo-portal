import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";

const rotatingWords = ["Prisma SASE", "NGFW", "AIRS", "CDSS", "Quantum Security", "Network Security"];

const GRID_SIZE = 40;

interface RippleCell {
  col: number;
  row: number;
  time: number;
}

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [ripples, setRipples] = useState<RippleCell[]>([]);
  const rippleFrameRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setCols(Math.ceil(width / GRID_SIZE));
      setRows(Math.ceil(height / GRID_SIZE));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Ripple animation loop
  const [rippleOpacities, setRippleOpacities] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (ripples.length === 0) {
      setRippleOpacities(new Map());
      return;
    }

    const animate = () => {
      const now = performance.now();
      const newMap = new Map<string, number>();
      const alive: RippleCell[] = [];

      for (const ripple of ripples) {
        const elapsed = now - ripple.time;
        const speed = 200; // ms per grid cell
        const maxDist = 8;
        const currentRadius = elapsed / speed;

        if (currentRadius > maxDist + 1) continue;
        alive.push(ripple);

        // Light up cells in a circle
        for (let dr = -maxDist; dr <= maxDist; dr++) {
          for (let dc = -maxDist; dc <= maxDist; dc++) {
            const dist = Math.sqrt(dr * dr + dc * dc);
            if (dist > currentRadius || dist < currentRadius - 1.2) continue;
            const opacity = Math.max(0, 1 - dist / maxDist) * Math.max(0, 1 - (currentRadius - dist) / 1.2);
            const cr = ripple.row + dr;
            const cc = ripple.col + dc;
            const key = `${cc}-${cr}`;
            newMap.set(key, Math.max(newMap.get(key) || 0, opacity));
          }
        }
      }

      setRippleOpacities(newMap);
      if (alive.length < ripples.length) setRipples(alive);
      if (alive.length > 0) {
        rippleFrameRef.current = requestAnimationFrame(animate);
      }
    };

    rippleFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rippleFrameRef.current);
  }, [ripples]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / GRID_SIZE);
    const row = Math.floor((e.clientY - rect.top) / GRID_SIZE);
    setHoveredCell(`${col}-${row}`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / GRID_SIZE);
    const row = Math.floor((e.clientY - rect.top) / GRID_SIZE);
    setRipples((prev) => [...prev, { col, row, time: performance.now() }]);
  }, []);

  const gridHeight = rows > 0 ? Math.ceil(rows / 2) : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0) 40%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0) 40%)",
      }}
    >
      {gridHeight > 0 &&
        Array.from({ length: gridHeight }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const key = `${c}-${r}`;
            const isHovered = hoveredCell === key;
            const rippleOp = rippleOpacities.get(key) || 0;
            return (
              <div
                key={key}
                className="absolute border"
                style={{
                  left: c * GRID_SIZE,
                  top: r * GRID_SIZE,
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                  borderColor: isHovered
                    ? "hsl(185 80% 55% / 0.15)"
                    : rippleOp > 0
                    ? `hsl(185 80% 55% / ${(rippleOp * 0.25).toFixed(3)})`
                    : "hsl(220 14% 16% / 0.3)",
                  backgroundColor: isHovered
                    ? "hsl(185 80% 55% / 0.04)"
                    : rippleOp > 0
                    ? `hsl(185 80% 55% / ${(rippleOp * 0.08).toFixed(3)})`
                    : "transparent",
                }}
              />
            );
          })
        )}
    </div>
  );
};

const HeroButton = ({ href, variant, children }: { href: string; variant: "filled" | "outline"; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hue, setHue] = useState(185);

  useEffect(() => {
    if (!isHovered) return;
    let frame: number;
    let start: number | null = null;
    const duration = 4000;
    const hues = [185, 220, 260, 300, 220, 185];

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      const progress = elapsed / duration;
      const segCount = hues.length - 1;
      const segProgress = progress * segCount;
      const segIndex = Math.floor(segProgress);
      const segFrac = segProgress - segIndex;
      const fromHue = hues[Math.min(segIndex, segCount)];
      const toHue = hues[Math.min(segIndex + 1, segCount)];
      setHue(fromHue + (toHue - fromHue) * segFrac);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  const baseClasses = "group flex items-center justify-center gap-3 px-14 py-7 rounded-2xl font-bold text-2xl transition-all duration-300";

  const dynamicStyle: React.CSSProperties = isHovered
    ? {
        background: `linear-gradient(90deg, hsl(${hue} 80% 55%), hsl(${(hue + 60) % 360} 70% 55%))`,
        color: "hsl(220 20% 4%)",
        boxShadow: `0 0 50px -10px hsl(${hue} 80% 55% / 0.5), 0 0 100px -20px hsl(${hue} 80% 55% / 0.25)`,
        borderColor: "transparent",
      }
    : {};

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setHue(185); }}
      className={`${baseClasses} ${
        variant === "filled"
          ? "bg-primary text-primary-foreground glow-primary"
          : "border-2 border-border text-foreground bg-secondary/50"
      }`}
      style={dynamicStyle}
    >
      {children}
    </a>
  );
};

const gradientStops = [
  "linear-gradient(90deg, hsl(185 80% 55%), hsl(220 70% 55%))",
  "linear-gradient(90deg, hsl(260 60% 60%), hsl(185 80% 55%))",
  "linear-gradient(90deg, hsl(220 70% 55%), hsl(260 60% 60%))",
  "linear-gradient(90deg, hsl(185 80% 55%), hsl(260 60% 55%), hsl(185 80% 55%))",
];

const DecisiveText = () => {
  const [hue, setHue] = useState(185);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 6000; // full cycle in ms
    const hues = [185, 220, 260, 300, 220, 185]; // smooth loop

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      const progress = elapsed / duration;
      
      // Interpolate through hue stops
      const segCount = hues.length - 1;
      const segProgress = progress * segCount;
      const segIndex = Math.floor(segProgress);
      const segFrac = segProgress - segIndex;
      const fromHue = hues[Math.min(segIndex, segCount)];
      const toHue = hues[Math.min(segIndex + 1, segCount)];
      setHue(fromHue + (toHue - fromHue) * segFrac);
      
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span
      className="inline-block"
      style={{
        backgroundImage: `linear-gradient(90deg, hsl(${hue} 80% 55%), hsl(${(hue + 60) % 360} 70% 55%))`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      decisive
    </span>
  );
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: "hsl(var(--background))" }}>
      {/* Interactive grid */}
      <InteractiveGrid />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-glow-secondary/5 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass glow-border mb-8 pointer-events-auto"
        >
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Enterprise Security • Executive Briefing Center</span>
        </motion.div>

        {/* Main headline with rotating text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold leading-[1.05] tracking-tight mb-6">
            <span className="block text-primary">NetSec</span>
            <span className="block text-foreground">Solutions</span>
          </h1>
        </motion.div>

        {/* Capability list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {[
            { title: "Secure AI by Design", items: ["Secure AI Ecosystem", "Secure GenAI Usage"] },
            { title: "Protect the Extended Network", items: ["Data Center Security", "Device Security", "OT Security", "5G Security"] },
            { title: "Prevent Network Threats", items: ["Malware Analysis / Sandboxing", "Internet Security", "Intrusion Prevention (IPS)", "Secure DNS Traffic"] },
            { title: "Simplify Network Security Management", items: ["Network Security Platform", "Unified Management Experience"] },
            { title: "Protect Data & SaaS Applications", items: ["Data Loss Prevention", "Secure Access Service Edge", "Zero Trust Network Access", "Cloud Secure Web Gateway", "SaaS Security (CASB)"] },
            { title: "Branch & SD-WAN", items: ["Autonomous Digital Experience Management"] },
          ].map((group) => (
            <div key={group.title} className="px-4 py-3 rounded-xl bg-glass glow-border">
              <h3 className="text-sm font-bold text-primary mb-2">{group.title}</h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
        >
          <HeroButton href="#value" variant="filled">
            Value Delivered
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </HeroButton>
          <HeroButton href="#vision" variant="filled">
            Vision Delivering
          </HeroButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pointer-events-auto"
        >
          {[
            { icon: Lock, label: "Zero-Trust Architecture", value: "100%" },
            { icon: Zap, label: "Faster Threat Response", value: "10x" },
            { icon: ShieldCheck, label: "Enterprise Clients", value: "500+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-glass glow-border">
              <stat.icon className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
