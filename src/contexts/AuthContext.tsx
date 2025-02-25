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

// Get cached auth state
const getCachedUser = () => {
  try {
    const cached = localStorage.getItem("auth_user");
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with cached user for instant auth state
  const [user, setUser] = useState<User | null>(() => getCachedUser());
  const [loading, setLoading] = useState(false);

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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Cache user data
        const userToCache = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        localStorage.setItem("auth_user", JSON.stringify(userToCache));
      } else {
        localStorage.removeItem("auth_user");
      }
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
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
