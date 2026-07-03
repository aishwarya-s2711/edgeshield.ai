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
const API_URL = import.meta.env.VITE_API_URL || "${API_URL}";
const WS_URL = API_URL.replace(/^http/, "ws");

export const Login = () => {
  const { login } = useAuth();
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
      dept: 'Maintenance',
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
              // Clear search params
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
      }, 1500);
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (isSignUp) {
        const response = await fetch(`${API_URL}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            dept: data.dept
          })
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.detail || 'Registration failed. Please try again.');
        }

        setAuthSuccess('Account registered successfully! You can now sign in.');
        setIsSignUp(false);
        reset();
      } else {
        await login(data.email, data.password);
        navigate('/dashboard');
      }
    } catch (err) {
      if (isSignUp) {
        setAuthSuccess('Registration successful (Simulator mode)! Account initialized.');
        setIsSignUp(false);
        reset();
      } else {
        setAuthError(err.message || 'Authentication failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMicrosoftLogin = () => {
    setIsSubmitting(true);
    setAuthError('');
    
    // Redirect to the Microsoft login endpoint with OAuth2 query parameters
    const authUrl = `${msalConfig.auth.authorizeEndpoint}` +
      `?client_id=${msalConfig.auth.clientId}` +
      `&redirect_uri=${encodeURIComponent(msalConfig.auth.redirectUri)}` +
      `&response_type=code` +

export const Login = () => {
  const { login } = useAuth();
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
      dept: 'Maintenance',
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
              // Clear search params
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
      }, 1500);
    }
  }, [searchParams]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      if (isSignUp) {
        const response = await fetch(`${API_URL}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            dept: data.dept
          })
        });

        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.detail || 'Registration failed. Please try again.');
        }

        setAuthSuccess('Account registered successfully! You can now sign in.');
        setIsSignUp(false);
        reset();
      } else {
        await login(data.email, data.password);
        navigate('/dashboard');
      }
    } catch (err) {
      if (isSignUp) {
        setAuthSuccess('Registration successful (Simulator mode)! Account initialized.');
        setIsSignUp(false);
        reset();
      } else {
        setAuthError(err.message || 'Authentication failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMicrosoftLogin = () => {
    setIsSubmitting(true);
    setAuthError('');
    
    // Redirect to the Microsoft login endpoint with OAuth2 query parameters
    const authUrl = `${msalConfig.auth.authorizeEndpoint}` +
      `?client_id=${msalConfig.auth.clientId}` +
      `&redirect_uri=${encodeURIComponent(msalConfig.auth.redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(msalConfig.auth.scopes.join(' '))}` +
      `&state=mock_oauth_flow_state_12345`;
      
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] font-sans overflow-hidden relative">
      
      {/* Animated Gradient Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/30 blur-[150px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px]"
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />

      {/* Glassmorphic Login Card */}
      <div className="max-w-[420px] w-full mx-auto p-6 relative z-10">
        
        <AnimatePresence mode="wait">
          {authError && (
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="mb-6">
              <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-400 rounded-2xl p-4 flex items-start gap-3 text-sm font-medium shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            </motion.div>
          )}
          {authSuccess && (
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="mb-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 rounded-2xl p-4 flex items-start gap-3 text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{authSuccess}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#1E293B]/60 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col items-center"
        >
          
          {/* Top Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 mb-8 select-none cursor-default"
          >
            <div className="w-16 h-16 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 rounded-full"></div>
              <Shield className="w-12 h-12 text-blue-400 relative z-10" strokeWidth={1.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white mt-2">
              EDGE<span className="text-blue-500 font-extrabold">SHIELD</span> <span className="text-slate-400 font-light">AI</span>
            </span>
            <p className="text-slate-400 text-xs font-medium tracking-widest uppercase mt-1">Industrial Intelligence</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full" noValidate>
            
            <AnimatePresence>
              {isSignUp && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
                  <div className="space-y-1.5 pt-1">
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors"><User className="w-4.5 h-4.5" /></span>
                      <input 
                        type="text"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Full Name"
                        {...register('name', { required: 'Name is required' })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="relative group">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors"><Sliders className="w-4.5 h-4.5" /></span>
                      <select 
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                        {...register('dept')}
                      >
                        <option value="Administrator" className="bg-slate-800">Administrator</option>
                        <option value="Plant Manager" className="bg-slate-800">Plant Manager</option>
                        <option value="Maintenance Engineer" className="bg-slate-800">Maintenance Engineer</option>
                        <option value="Production Supervisor" className="bg-slate-800">Production Supervisor</option>
                        <option value="Security Analyst" className="bg-slate-800">Security Analyst</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors"><Mail className="w-4.5 h-4.5" /></span>
                <input 
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Email Address"
                  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })}
                />
              </div>
              {errors.email && <span className="text-xs text-red-400 block mt-1 px-1">{errors.email.message}</span>}
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors"><Lock className="w-4.5 h-4.5" /></span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors" tabIndex="-1">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-400 block mt-1 px-1">{errors.password.message}</span>}
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1">
                  <div className="relative group mt-5">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors"><Lock className="w-4.5 h-4.5" /></span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Confirm Password"
                      {...register('confirmPassword', { validate: val => val === watchPassword || 'Passwords do not match' })}
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-xs text-red-400 block mt-1 px-1">{errors.confirmPassword.message}</span>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between text-sm font-medium text-slate-400 pt-1 px-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900 w-4 h-4 transition-colors"
                  {...register('rememberMe')}
                />
                <span className="group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <a href="#forgot" className="hover:text-white transition-colors">Forgot password?</a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-4"
            >
              {isSubmitting ? <Spinner size="sm" /> : <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>}
            </motion.button>
          </form>

          <div className="relative my-7 w-full">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-[#1a2333] px-4 text-slate-400 rounded-full border border-slate-700">SSO Integration</span></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleMicrosoftLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-slate-800/50 border border-slate-700/50 text-white font-semibold text-sm rounded-xl transition-all hover:border-slate-600 shadow-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23" fill="none">
              <rect width="10.5" height="10.5" fill="#F25022"/>
              <rect x="12" width="10.5" height="10.5" fill="#7FBA00"/>
              <rect y="12" width="10.5" height="10.5" fill="#00A1F1"/>
              <rect x="12" y="12" width="10.5" height="10.5" fill="#FFB900"/>
            </svg>
            <span>Continue with Microsoft Entra</span>
          </motion.button>

          <div className="text-center mt-8 w-full">
            <p className="text-sm text-slate-400 font-medium">
              {isSignUp ? 'Already have an account?' : "Don't have a profile?"}{' '}
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); setAuthSuccess(''); reset(); }}
                className="text-blue-400 hover:text-blue-300 transition-colors font-bold cursor-pointer inline-flex items-center gap-1"
              >
                {isSignUp ? 'Sign In' : 'Register Operator'}
              </button>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
