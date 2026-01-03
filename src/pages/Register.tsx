import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await register(email, password, name);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div style={{width:"100svw"}} className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
            style={{fontSize:"1rem", padding:"0.75rem 1rem", background:"none", borderBottom:"1px solid rgba(100 100 100/ 50%)", width:"100%"}}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
            style={{fontSize:"1rem", padding:"0.75rem 1rem", background:"none", borderBottom:"1px solid rgba(100 100 100/ 50%)", width:"100%"}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
            style={{fontSize:"1rem", padding:"0.75rem 1rem", background:"none", borderBottom:"1px solid rgba(100 100 100/ 50%)", width:"100%"}}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            
              required
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
            style={{fontSize:"1rem", padding:"0.75rem 1rem", background:"none", borderBottom:"1px solid rgba(100 100 100/ 50%)", width:"100%"}}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            
              required
              placeholder="Confirm your password"
            />
          </div>
          <br/>
          <Button style={{padding:"1.25rem", background:"midnightblue", color:"white"}} type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link style={{fontWeight:600}} to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
