import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{border:"", width:"100svw"}} className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center" style={{border:""}}>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <Button style={{background:"crimson", color:"white"}} onClick={handleLogout} variant="ghost">
            Logout
          </Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> <span className="capitalize">{user?.role}</span></p>
            <p><strong>User ID:</strong> {user?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
          style={{background:"none"}}
            onClick={() => navigate('/profile')} 
            variant="outline"
            className="h-24"
          >
            View Profile
          </Button>
          
          {user?.role === 'admin' && (
            <Button
            style={{background:"none"}} 
              onClick={() => navigate('/admin')} 
              variant="outline"
              className="h-24"
            >
              Admin Panel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
