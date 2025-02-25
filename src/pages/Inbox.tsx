import { MailDisplay, MailList, type Mail } from "@/components/mail/MailList";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Inbox = () => {
  const navigate = useNavigate();
  const [selectedMail, setSelectedMail] = useState<Mail>();
  const [showPreview, setShowPreview] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      navigate("/dashboard", { state: { direction: "right" } });
    }
  };

  const handleSelectMail = (mail: Mail) => {
    setSelectedMail(mail);
    setShowPreview(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="fixed inset-0 bg-background overflow-hidden"
    >
      <div
        style={{ padding: "1rem" }}
        className="flex items-center border-b px-5"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-10 w-10"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="ml-4 text-4xl font-semibold">Inbox</div>
      </div>
      <div className="relative h-[calc(100vh-3.5rem)] md:grid md:grid-cols-[1fr_1fr]">
        <AnimatePresence mode="wait">
          {(!showPreview || isDesktop) && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 md:relative"
            >
              <MailList
                selectedMail={selectedMail}
                onSelectMail={handleSelectMail}
              />
            </motion.div>
          )}
          {selectedMail && (showPreview || isDesktop) && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 md:relative md:border-l"
            >
              <MailDisplay mail={selectedMail} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
