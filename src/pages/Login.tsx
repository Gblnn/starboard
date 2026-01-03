import { Button } from '@/components/ui/button';
import { ChevronRight, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        setLoading(true);
      const userData = await login(email, password);
      setLoading(false);
      toast.success('Login successful!');
      
      // Navigate based on user role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
        setLoading(false);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex p-4 sm:p-5 h-screen w-full" style={{width:"100svw"}}>
      {/* Left side - Desktop only gradient panel */}
      <div
        className="hidden lg:flex flex-1 bg-gradient-to-br from-[#191970] to-[crimson] items-end rounded-2xl"
      >
        <div className="flex items-center m-8 gap-3">
          <img src="/starboard-logo.png" className="w-16 h-16 object-contain" alt="StarBoard Logo" />
          <div className="flex items-center gap-3">
            <p className="font-normal text-4xl text-white">StarBoard</p>
            <p className="text-white/80">v2.0</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 h-full justify-center items-center flex-col w-full">
        {/* Mobile logo */}
        <div style={{border:"", padding:""}} className="lg:hidden flex items-center gap-3 mb-8">
          <img src="/starboard-logo.png" className="w-12 h-12 object-contain" alt="StarBoard Logo" />
          <div className="flex items-center gap-2">
            <p style={{fontSize:"1.75rem", fontWeight:"500"}} className="font-semibold text-2xl">StarBoard</p>
            <p className="text-sm text-muted-foreground">2.1</p>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col rounded-2xl w-full max-w-md px-4">
          <div className="flex flex-col w-full gap-3 mt-8">
            <h2 className="text-3xl sm:text-4xl font-semibold pl-2 mb-2">
              LOGIN
            </h2>

            <Input
            style={{fontSize:"1rem", padding:"1.5rem 1rem", borderRadius:"0.5rem"}} 
              autoComplete="email"
              id="email"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email Address"
              className="w-full"
            />

            <div className="relative w-full">
              <Input
              style={{fontSize:"1rem", padding:"1.5rem 1rem", borderRadius:"0.5rem"}} 
                id="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full"
              />
              <button
              style={{background:"none"}}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer flex items-center"
                type="button"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500" />
                ) : (
                  <Eye size={18} className="text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <Link
              style={{color:"crimson",fontWeight:"600", fontSize:"0.85rem", marginLeft:"0.5rem"}}
                className="text-xs sm:text-sm font-semibold hover:underline"
                to={"/user-reset"}
              >
                Forgot Password?
              </Link>
            </div>

            <Button
            style={{padding:"1.5rem", fontSize:"1rem", background:"crimson"}}
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-[#191970] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-3 hover:bg-[#191970]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                loading ? 'disabled' : ''
              }`}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              LOGIN
              <ChevronRight size={12} />
            </Button>
          </div>

          <div className="flex flex-col gap-2 mt-12 w-full">
            <p className="opacity-50 text-xs leading-relaxed">
              If you do not have an account you can create one, if your email exists on our system.
            </p>
            <Button
            style={{padding:"1.4rem",width:"100%", fontWeight:600, fontSize:"0.85rem", background:"rgba(100 100 100/ 10%)" }}
              className="text-sm font-bold text-[darkslateblue] hover:underline"

            >
                <UserPlus/>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
