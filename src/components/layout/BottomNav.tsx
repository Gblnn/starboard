import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings, Files } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8">
      <nav className="mx-auto max-w-xs rounded-2xl border border-border/40 bg-background/60 p-2 backdrop-blur-xl shadow-[0_0_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_32px_0_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:bg-primary/10",
              location.pathname === "/dashboard" && [
                "bg-primary/10",
                "after:absolute after:bottom-1 after:h-1 after:w-6 after:rounded-full after:bg-primary after:content-['']",
              ]
            )}
          >
            <LayoutDashboard
              className={cn(
                "h-6 w-6 transition-colors duration-200",
                location.pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Link>

          <Link
            to="/records"
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:bg-primary/10",
              location.pathname === "/records" && [
                "bg-primary/10",
                "after:absolute after:bottom-1 after:h-1 after:w-6 after:rounded-full after:bg-primary after:content-['']",
              ]
            )}
          >
            <FileText
              className={cn(
                "h-6 w-6 transition-colors duration-200",
                location.pathname === "/records"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Link>

          <Link
            to="/documents"
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:bg-primary/10",
              location.pathname === "/documents" && [
                "bg-primary/10",
                "after:absolute after:bottom-1 after:h-1 after:w-6 after:rounded-full after:bg-primary after:content-['']",
              ]
            )}
          >
            <Files
              className={cn(
                "h-6 w-6 transition-colors duration-200",
                location.pathname === "/documents"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Link>

          <Link
            to="/settings"
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:bg-primary/10",
              location.pathname === "/settings" && [
                "bg-primary/10",
                "after:absolute after:bottom-1 after:h-1 after:w-6 after:rounded-full after:bg-primary after:content-['']",
              ]
            )}
          >
            <Settings
              className={cn(
                "h-6 w-6 transition-colors duration-200",
                location.pathname === "/settings"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};
