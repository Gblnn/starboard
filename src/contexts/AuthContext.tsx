import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/config/firebase";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  type User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setAuthPersistence: (remember: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setAuthPersistence: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuthPersistence = async (remember: boolean) => {
    try {
      const persistenceType = remember
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
    } catch (error) {
      console.error("Error setting auth persistence:", error);
    }
  };

  useEffect(() => {
    // Check if we have a cached auth state
    const cachedUser = auth.currentUser;
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Only show loading spinner for unauthed users
  if (loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, setAuthPersistence }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
