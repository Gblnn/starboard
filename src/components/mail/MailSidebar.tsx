import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Send,
  Archive,
  Trash,
  File,
  Users,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

interface Category {
  icon: typeof Inbox;
  name: string;
  count: number;
}

const categories: Category[] = [
  { icon: Inbox, name: "Inbox", count: 128 },
  { icon: File, name: "Drafts", count: 9 },
  { icon: Send, name: "Sent", count: 24 },
  { icon: Trash, name: "Trash", count: 3 },
  { icon: Archive, name: "Archive", count: 14 },
];

const labels: Category[] = [
  { icon: Users, name: "Social", count: 972 },
  { icon: AlertCircle, name: "Updates", count: 342 },
  { icon: ShoppingCart, name: "Shopping", count: 8 },
];

interface NavItemProps {
  icon: typeof Inbox;
  name: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, name, count, isActive, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2 px-2", isActive && "bg-accent")}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-sm font-normal">{name}</span>
      {count > 0 && (
        <span className="text-xs font-normal text-muted-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}

export function MailSidebar() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        {categories.map((category) => (
          <NavItem key={category.name} {...category} />
        ))}
      </div>
      <div className="border-t pt-4">
        <h3 className="px-2 text-sm font-semibold">Labels</h3>
        <div className="mt-2 flex flex-col gap-1">
          {labels.map((label) => (
            <NavItem key={label.name} {...label} />
          ))}
        </div>
      </div>
    </div>
  );
}
