import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { msalConfig } from '../utils/authConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Mail, 
  User,
  Sliders,
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dept: 'Maintenance Engineer',
      rememberMe: false
    }
  });

  const watchPassword = watch('password', '');

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setIsSubmitting(true);
      setAuthError('');
      setAuthSuccess('SSO Authentication code received. Validating session...');
      
      setTimeout(() => {
        if (code === 'mock_entra_auth_code_xyz') {
          login('operator@edgeshield.ai', 'password123')
            .then(() => {
              setAuthSuccess('SSO Authentication successful. Welcome!');
              const newParams = new URLSearchParams(window.location.search);
              newParams.delete('code');
              newParams.delete('state');
              setSearchParams(newParams);
              navigate('/dashboard');
            })
            .catch(() => {
              setAuthError('SSO Login validation failed. User is not registered in the OT database.');
              setIsSubmitting(false);
            });
        } else {
          setAuthError('Invalid Azure Entra ID authorization token or state mismatch.');
          setIsSubmitting(false);
        }
      }, 1200);
    }
  }, [searchParams, login, navigate, setSearchParams]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (isSignUp) {
        await signup(data.name, data.email, data.password, data.dept);
        setAuthSuccess('Account created successfully. Please sign in.');
        setTimeout(() => {
          setIsSignUp(false);
          reset();
          setIsSubmitting(false);
        }, 1500);
      } else {
        await login(data.email, data.password);
        navigate('/dashboard');
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify your credentials.');
      setIsSubmitting(false);
    }
  };

  const handleMicrosoftLogin = () => {
    setIsSubmitting(true);
    setAuthError('');
    
    setTimeout(() => {
      window.location.href = `${window.location.origin}${window.location.pathname}?code=mock_entra_auth_code_xyz&state=12345`;
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 font-sans p-6 relative">
      <div className="w-full max-w-[420px] bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
          
          {/* Header Branding */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-6">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
              {isSignUp ? 'Create an Account' : 'Welcome back'}
            </h2>
            <p className="text-sm font-semibold text-gray-500">
              {isSignUp ? 'Register for enterprise OT access.' : 'Sign in to your EdgeShield AI dashboard.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {authError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="mb-6">
                <Alert type="error" message={authError} onClose={() => setAuthError('')} />
              </motion.div>
            )}
            {authSuccess && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="mb-6">
                <Alert type="success" message={authSuccess} onClose={() => setAuthSuccess('')} />
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <AnimatePresence>
              {isSignUp && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }} 
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><User className="w-4 h-4" /></span>
                      <input 
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="John Doe"
                        {...register('name', { required: isSignUp ? 'Name is required' : false })}
                      />
                    </div>
                    {errors.name && <span className="text-[11px] text-red-500 font-bold ml-1">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Department</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><Sliders className="w-4 h-4" /></span>
                      <select 
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer"
                        {...register('dept')}
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Plant Manager">Plant Manager</option>
                        <option value="Maintenance Engineer">Maintenance Engineer</option>
                        <option value="Machine Operator">Machine Operator</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><Mail className="w-4 h-4" /></span>
                <input 
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="name@company.com"
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email format' } 
                  })}
                />
              </div>
              {errors.email && <span className="text-[11px] text-red-500 font-bold ml-1">{errors.email.message}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><Lock className="w-4 h-4" /></span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors" tabIndex="-1">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <span className="text-[11px] text-red-500 font-bold ml-1">{errors.password.message}</span>}
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400"><Lock className="w-4 h-4" /></span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                      placeholder="••••••••"
                      {...register('confirmPassword', { validate: val => val === watchPassword || 'Passwords do not match' })}
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-[11px] text-red-500 font-bold ml-1">{errors.confirmPassword.message}</span>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between text-xs font-bold pt-1 mb-2">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  {...register('rememberMe')}
                />
                <span className="text-gray-500 group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#forgot" className="text-blue-600 hover:text-blue-700 hover:underline transition-all">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-gray-900/10 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Spinner size="sm" /> : <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>}
            </button>
          </form>

          <div className="relative my-7 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <span className="relative bg-white px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Or continue with</span>
          </div>

          <button
            type="button"
            onClick={handleMicrosoftLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-slate-50 text-gray-900 font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23" fill="none">
              <rect width="10.5" height="10.5" fill="#F25022"/>
              <rect x="12" width="10.5" height="10.5" fill="#7FBA00"/>
              <rect y="12" width="10.5" height="10.5" fill="#00A1F1"/>
              <rect x="12" y="12" width="10.5" height="10.5" fill="#FFB900"/>
            </svg>
            <span>Microsoft Entra ID</span>
          </button>

          <div className="text-center mt-8">
            <p className="text-sm font-semibold text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); setAuthSuccess(''); reset(); }}
                className="text-blue-600 hover:text-blue-700 transition-colors font-bold"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

      </div>
    </div>
  );
};

export default Login;
