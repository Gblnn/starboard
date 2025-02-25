import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageTransition } from "@/components/transitions/PageTransition";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl p-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold">Settings</h1>
          <div className="border-t pt-6">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Sign out</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign out</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to sign out?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing out
                      </>
                    ) : (
                      "Sign out"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
