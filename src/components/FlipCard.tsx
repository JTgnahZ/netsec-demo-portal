import { type LucideIcon } from "lucide-react";

interface SubDemo {
  label: string;
  url: string;
}

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  url: string;
  accentColor: string; // e.g. "sky" or "purple"
  subDemos?: SubDemo[];
}

const defaultSubDemos = (baseUrl: string): SubDemo[] => [
  { label: "Overview", url: baseUrl },
  { label: "Live Demo", url: baseUrl },
  { label: "Use Cases", url: baseUrl },
];

const FlipCard = ({ icon: Icon, title, subtitle, url, accentColor, subDemos }: FlipCardProps) => {
  const demos = subDemos || defaultSubDemos(url);
  const bgClass = accentColor === "sky" ? "bg-sky-400/10 group-hover:bg-sky-400/20" : "bg-purple-400/10 group-hover:bg-purple-400/20";
  const iconClass = accentColor === "sky" ? "text-sky-400" : "text-purple-400";
  const dotClass = accentColor === "sky" ? "bg-sky-400" : "bg-purple-400";
  const linkHoverClass = accentColor === "sky" ? "hover:text-sky-400" : "hover:text-purple-400";

  return (
    <div className="group [perspective:600px] cursor-pointer" style={{ minHeight: 160 }}>
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center text-center p-4 rounded-xl">
          <div className={`w-9 h-9 rounded-lg ${bgClass} flex items-center justify-center mb-2 transition-colors`}>
            <Icon className={`w-4.5 h-4.5 ${iconClass}`} />
          </div>
          <h3 className="text-xs font-semibold text-foreground leading-tight mb-0.5">{title}</h3>
          <p className="text-[10px] text-muted-foreground leading-tight">{subtitle}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-start justify-center p-4 rounded-xl">
          <h4 className="text-sm font-semibold text-foreground mb-2">{title}</h4>
          <ul className="w-full space-y-1.5">
            {demos.map((demo) => (
              <li key={demo.label}>
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-[10px] text-muted-foreground ${linkHoverClass} transition-colors`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={`w-1 h-1 rounded-full ${dotClass} shrink-0`} />
                  {demo.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
