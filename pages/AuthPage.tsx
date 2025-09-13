import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { EnvelopeIcon } from '../components/icons/EnvelopeIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { UserIcon } from '../components/icons/UserIcon';


const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authMode === 'register') {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    
    // In a real app, you'd have separate login/register logic.
    // For this mock, we'll just log the user in.
    auth.login(role);
    
    if (role === 'gov') {
      navigate('/gov-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };
  
  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('user');
    setError(null);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex bg-slate-100">
      <div className="flex w-full max-w-6xl mx-auto my-auto shadow-2xl rounded-xl overflow-hidden">
        {/* Decorative Panel */}
        <div className="hidden lg:flex w-1/2 relative items-end p-12 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop')" }}>
           <div className="absolute inset-0 bg-black/50"></div>
           <div className="relative z-10 text-white">
             <h1 className="text-4xl font-bold leading-tight">FRA Atlas and Decision Support System</h1>
             <p className="mt-6 text-lg italic text-slate-200">
               "Land is the secure ground of home, the sea of livelihood, the foundation of a community."
             </p>
           </div>
        </div>
        
        {/* Form Panel */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <div className="flex border-b mb-6">
                <button onClick={() => { setAuthMode('login'); resetForm(); }} className={`px-6 py-2 font-semibold ${authMode === 'login' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500'}`}>
                    Login
                </button>
                <button onClick={() => { setAuthMode('register'); resetForm(); }} className={`px-6 py-2 font-semibold ${authMode === 'register' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500'}`}>
                    Register
                </button>
            </div>
          
            <form className="space-y-5" onSubmit={handleSubmit}>
                {authMode === 'register' && (
                    <InputField Icon={UserIcon} type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                )}
                
                <InputField Icon={EnvelopeIcon} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                <InputField Icon={LockClosedIcon} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                
                {authMode === 'register' && (
                    <InputField Icon={LockClosedIcon} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                )}
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                    {authMode === 'register' ? 'I am registering as a...' : 'I am logging in as a...'}
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base bg-slate-800 text-white border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  >
                    <option value="user">Community User</option>
                    <option value="gov">Government Official</option>
                  </select>
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105"
                >
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
}

const InputField: React.FC<InputFieldProps> = ({ Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-slate-400" />
    </div>
    <input
      {...props}
      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-slate-600 bg-slate-800 placeholder-slate-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    />
  </div>
);

export default AuthPage;