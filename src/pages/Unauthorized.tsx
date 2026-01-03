import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl font-bold text-red-500">403</div>
        <h1 className="text-3xl font-bold">Unauthorized Access</h1>
        <p className="text-muted-foreground max-w-md">
          You don't have permission to access this page. 
          Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
