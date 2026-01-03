import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type UserRole } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  allowedRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen fade-in">
        <div className="text-lg"><Loader2 className='animate-spin'/></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
