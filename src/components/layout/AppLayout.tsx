import { BottomNav } from "@/components/layout/BottomNav";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-16">
      <AnimatePresence mode="wait">
        <div key={location.pathname}>{children}</div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
