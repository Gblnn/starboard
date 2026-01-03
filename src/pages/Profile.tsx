import Back from '@/components/back';
import Directive from '@/components/directive';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile = () => {
  const { user } = useAuth();
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background " style={{width:"100svw"}}>
        <Back fixed/>
      <div className="max-w-2xl mx-auto space-y-6">
        <Directive icon={<User/>} title={user?.name}/>
        
        {/* <div className="bg-card p-8 rounded-lg shadow">
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
        </div> */}
      </div>
    </div>
  );
};
