import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe">
      <div className="flex h-16 items-center justify-around px-safe-left pr-safe-right">
        <Link
          to="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center px-5 py-2",
            location.pathname === "/dashboard" && "text-primary"
          )}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs">Dashboard</span>
        </Link>

        <Link
          to="/records"
          className={cn(
            "flex flex-col items-center justify-center px-5 py-2",
            location.pathname === "/records" && "text-primary"
          )}
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs">Records</span>
        </Link>

        <Link
          to="/settings"
          className={cn(
            "flex flex-col items-center justify-center px-5 py-2",
            location.pathname === "/settings" && "text-primary"
          )}
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </nav>
  );
};
