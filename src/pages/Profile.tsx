import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8" style={{width:"100svw"}}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button onClick={() => navigate('/dashboard')} variant="outline" style={{background:"none"}}>
          <ChevronLeft/>
        </Button>
        
        <div className="bg-card p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Name
              </label>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Role
              </label>
              <p className="text-lg capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                User ID
              </label>
              <p className="text-lg font-mono">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
