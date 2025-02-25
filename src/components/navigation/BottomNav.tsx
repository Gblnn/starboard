import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: Database,
    href: "/records",
    label: "Records",
  },
  {
    icon: FileText,
    href: "/documents",
    label: "Documents",
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="mx-auto flex max-w-md justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "relative flex flex-col gap-1 transition-colors h-14 w-14",
                isActive &&
                  "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']"
              )}
            >
              <Link to={item.href}>
                <item.icon className="h-7 w-7" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
