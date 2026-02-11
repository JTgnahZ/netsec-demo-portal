import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";

const rotatingWords = ["Prisma SASE", "NGFW", "AIRS", "CDSS", "Quantum Security", "Network Security"];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

const GRID_SIZE = 40;

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCells, setHoveredCells] = useState<Set<string>>(new Set());
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / GRID_SIZE);
      const row = Math.floor(y / GRID_SIZE);
      const key = `${col}-${row}`;
      setHoveredCells((prev) => {
        const next = new Set(prev);
        next.add(key);
        // Fade out after a delay
        setTimeout(() => {
          setHoveredCells((p) => {
            const n = new Set(p);
            n.delete(key);
            return n;
          });
        }, 800);
        return next;
      });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
    >
      {rows > 0 &&
        Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const key = `${c}-${r}`;
            const isActive = hoveredCells.has(key);
            return (
              <div
                key={key}
                className="absolute border transition-all duration-500"
                style={{
                  left: c * GRID_SIZE,
                  top: r * GRID_SIZE,
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                  borderColor: isActive
                    ? "hsl(185 80% 55% / 0.25)"
                    : "hsl(220 14% 16% / 0.3)",
                  backgroundColor: isActive
                    ? "hsl(185 80% 55% / 0.06)"
                    : "transparent",
                }}
              />
            );
          })
        )}
    </div>
  );
};

/** Scramble text component — reveals each character with random scramble */
const ScrambleWord = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState<string[]>(Array(text.length).fill(""));
  const [settled, setSettled] = useState<boolean[]>(Array(text.length).fill(false));

  useEffect(() => {
    const chars = text.split("");
    const newDisplayed = Array(chars.length).fill("");
    const newSettled = Array(chars.length).fill(false);
    setDisplayed(newDisplayed);
    setSettled(newSettled);

    // For each character, scramble for a staggered duration then settle
    chars.forEach((char, i) => {
      const scrambleDuration = 300 + i * 80; // stagger each letter
      const scrambleInterval = 40;
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += scrambleInterval;
        if (elapsed >= scrambleDuration) {
          clearInterval(interval);
          setDisplayed((prev) => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
          setSettled((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        } else {
          setDisplayed((prev) => {
            const next = [...prev];
            next[i] = char === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            return next;
          });
        }
      }, scrambleInterval);

      return () => clearInterval(interval);
    });
  }, [text]);

  return (
    <span className="inline-flex" aria-label={text}>
      {displayed.map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            color: settled[i] ? undefined : "hsl(185 80% 75%)",
          }}
          transition={{
            duration: 0.15,
            delay: i * 0.03,
          }}
          className={`inline-block font-mono ${settled[i] ? "text-primary font-sans" : "text-primary/60"}`}
          style={{ minWidth: char === " " ? "0.35em" : undefined }}
        >
          {char || "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="block mb-4 min-h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[currentIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  <ScrambleWord text={rotatingWords[currentIndex]} />
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-foreground">made </span><span className="text-primary">decisive</span>
          </h1>
        </motion.div>

        {/* Decorative frame around rotating word - like AttendFlow's bounding box */}
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore real-world solutions, proven outcomes, and the future of enterprise
          network defense — all in one interactive demo portal.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="#value"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-primary"
          >
            Value Delivered
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#vision"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
          >
            Vision Delivering
          </a>
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
