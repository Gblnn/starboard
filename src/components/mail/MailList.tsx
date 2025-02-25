import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels?: string[];
}

const mails: Mail[] = [
  {
    id: "1",
    name: "William Smith",
    email: "william@example.com",
    subject: "Meeting Tomorrow",
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. I think we can improve our current approach and make the workflow more efficient. Let me know what time works best for you.",
    date: "2024-03-12",
    read: false,
    labels: ["work", "important"],
  },
  {
    id: "2",
    name: "Sarah Brown",
    email: "sarah@example.com",
    subject: "Project Update - Q1 2024",
    text: "Here's the latest update on our ongoing projects. The team has made significant progress on the main features. We've completed the initial testing phase and are ready to move forward with the next steps. I've attached the detailed report for your review.",
    date: "2024-03-11",
    read: true,
    labels: ["work"],
  },
  // Add more mails...
];

interface MailItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mail: Mail;
  isSelected?: boolean;
}

export function MailItem({
  mail,
  isSelected,
  onClick,
  ...props
}: MailItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-ring",
        isSelected && "bg-muted",
        !mail.read && "border-primary"
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="grid gap-1">
          <div className="font-semibold">{mail.name}</div>
          <div className="line-clamp-1 text-xs text-muted-foreground">
            {mail.subject}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {new Date(mail.date).toLocaleDateString()}
          </div>
          {!mail.read && (
            <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
          )}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {mail.text}
      </div>
      {mail.labels && mail.labels.length > 0 && (
        <div className="flex gap-2 mt-2">
          {mail.labels.map((label) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
      )}
    </button>
  );
}

export function MailList({
  selectedMail,
  onSelectMail,
}: {
  selectedMail?: Mail;
  onSelectMail: (mail: Mail) => void;
}) {
  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-2 p-4 pb-36">
        {mails.map((mail) => (
          <MailItem
            key={mail.id}
            mail={mail}
            isSelected={selectedMail?.id === mail.id}
            onClick={() => onSelectMail(mail)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

export function MailDisplay({ mail }: { mail: Mail }) {
  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <div className="flex items-start justify-between gap-2 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">{mail.subject}</h2>
          <div className="mt-1">
            <span className="font-semibold">{mail.name}</span>
            <span className="text-muted-foreground"> &lt;{mail.email}&gt;</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(mail.date).toLocaleDateString()}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="text-sm">{mail.text}</div>
      </ScrollArea>
    </div>
  );
}

export { type Mail, mails };
