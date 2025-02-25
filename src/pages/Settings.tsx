import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
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
                <Button variant="destructive" className="gap-2">
                  <LogOut className="h-5 w-5" />
                  Sign out
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90%] rounded-lg border-none bg-background/80 backdrop-blur-xl sm:max-w-[425px]">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-xl">Sign out?</DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    Are you sure you want to sign out of your account? You'll
                    need to sign in again to access your data.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex-row gap-2 sm:gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                    className="flex-1 rounded-lg border-none bg-muted/50 hover:bg-muted"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="flex-1 rounded-lg bg-destructive/90 hover:bg-destructive"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing out...
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
