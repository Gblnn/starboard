import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Loader2, Ship } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { Checkbox } from "@/components/ui/checkbox";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { user, setAuthPersistence } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await setAuthPersistence(rememberMe);
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setIsResetting(true);
    setError("");
    setResetSuccess(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (error) {
      setError("Failed to send reset email. Please check your email address.");
      console.error("Error sending reset email:", error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Pattern and Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-slate-200/10" />

        {/* Gradient Orbs */}
        <div
          className="absolute left-[10%] top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[100px]"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute right-[15%] top-2/3 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px]"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute left-[40%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[100px]"
          style={{ willChange: "transform" }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Logo and App Name */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="absolute left-8 top-8 flex items-center gap-3"
      >
        <Ship className="h-8 w-8 text-primary" />
        <span
          style={{ fontSize: "1.75rem", fontWeight: 400 }}
          className="text-xl"
        >
          StarBoard
        </span>
      </motion.div>

      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.1,
          }}
        >
          <Card>
            <CardHeader className="space-y-2 pb-4 pt-6">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                SIGN IN
              </CardTitle>
              <br />
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md bg-destructive/20 p-3 text-sm font-medium text-destructive"
                  >
                    {error}
                  </motion.div>
                )}
                {resetSuccess && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md bg-green-500/20 p-3 text-sm font-medium text-green-600 dark:text-green-400"
                  >
                    Password reset email sent. Please check your inbox.
                  </motion.div>
                )}
              </AnimatePresence>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-input"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Stay Signed In
                  </label>
                </div>

                <br />

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in
                      </>
                    ) : (
                      <>
                        SIGN IN
                        <ChevronRight />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm text-muted-foreground hover:text-primary"
                    onClick={handleForgotPassword}
                    disabled={isResetting}
                  >
                    {isResetting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset email...
                      </>
                    ) : (
                      "Forgot password?"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
