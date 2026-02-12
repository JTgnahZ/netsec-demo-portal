import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">

      <div className="bg-glass rounded-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            NetSec <span className="text-popover-foreground">EBC Demo Portal</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: 'smooth' });}}>Home</a>
          <a href="#value" className="hover:text-foreground transition-colors">Value</a>
          <a href="#vision" className="hover:text-foreground transition-colors">Vision</a>
          <a href="https://sasesensai.paloaltonetworks.com/EBC2026/trainer" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Trainer</a>
          <a href="https://stratacloudmanager.paloaltonetworks.com/home?tsg_id=1228584868" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Demo Tenant</a>
          <a href="https://reachsuite.app/go/exp-f8505ef2" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Simulation Tenant</a>
        </div>

        <div className="flex items-center gap-3">
          





          





        </div>
      </div>
    </motion.nav>);

};

export default Navbar;