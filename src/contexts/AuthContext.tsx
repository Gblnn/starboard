import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_CACHE_KEY = 'starboard_user_data';

// Helper function to cache user data locally
const cacheUserData = (userData: User) => {
  try {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error caching user data:', error);
  }
};

// Helper function to get cached user data
const getCachedUserData = (): User | null => {
  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Error reading cached user data:', error);
    return null;
  }
};

// Helper function to clear cached user data
const clearCachedUserData = () => {
  try {
    localStorage.removeItem(USER_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing cached user data:', error);
  }
};

// Helper function to fetch user data from Firestore
const getUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
  const userDocRef = doc(db, 'users', firebaseUser.uid);
  
  try {
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        role: data.role || 'user',
        name: data.name || firebaseUser.email?.split('@')[0] || 'User',
      };
      
      // Cache the user data for offline access
      cacheUserData(userData);
      return userData;
    } else {
      // If no user document exists, create one with default values
      const defaultUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        role: 'user',
        name: firebaseUser.email?.split('@')[0] || 'User',
      };
      
      await setDoc(userDocRef, {
        role: defaultUser.role,
        name: defaultUser.name,
        email: defaultUser.email,
        createdAt: new Date().toISOString(),
      });
      
      // Cache the user data
      cacheUserData(defaultUser);
      return defaultUser;
    }
  } catch (error) {
    console.error('Error fetching user data from Firestore:', error);
    
    // If offline or error, try to use cached data
    const cachedData = getCachedUserData();
    if (cachedData && cachedData.id === firebaseUser.uid) {
      console.log('Using cached user data (offline mode)');
      return cachedData;
    }
    
    throw error;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cached user data immediately for instant access
    const cachedUser = getCachedUserData();
    if (cachedUser) {
      setUser(cachedUser);
    }
    
    // Set loading to false immediately to show login screen faster
    // Firebase auth will update user state in the background
    setIsLoading(false);

    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser);
          setUser(userData);
          cacheUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Keep using cached data if available
          const cachedData = getCachedUserData();
          if (cachedData && cachedData.id === firebaseUser.uid) {
            console.log('Continuing with cached user data due to error');
            setUser(cachedData);
          } else {
            setUser(null);
            clearCachedUserData();
          }
        }
      } else {
        setUser(null);
        clearCachedUserData();
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(userCredential.user);
      setUser(userData);
      cacheUserData(userData);
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = 'user') => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        role,
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      
      const userData: User = {
        id: userCredential.user.uid,
        email,
        role,
        name,
      };
      
      cacheUserData(userData);
      setUser(userData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      clearCachedUserData();
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
