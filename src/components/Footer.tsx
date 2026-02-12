import strataLogo from "@/assets/strata-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={strataLogo} alt="Strata logo" className="w-5 h-5" />
          <span className="text-sm font-semibold text-destructive-foreground">
            NetSec <span className="text-destructive-foreground">EBC</span> Demo Portal
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Palo Alto Networks. Confidential — for executive briefing purposes only.
        </p>
      </div>
    </footer>);

};

export default Footer;