import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Wallet, ArrowLeft } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <BackgroundAnimation />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
      </Link>

      <div className="max-w-md w-full relative">
        <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] rounded-full -z-10" />
        
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-[3rem] p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-600/40">
              <Wallet size={32} />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Continue your financial journey</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-slate-800 rounded-[1.5rem] outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 text-white placeholder:text-slate-600 transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-950/50 border border-slate-800 rounded-[1.5rem] outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 text-white placeholder:text-slate-600 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : (
                <>
                  Sign In 
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowLeft size={14} className="rotate-180" />
                  </div>
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-bold">
            New here?{' '}
            <Link to="/signup" className="text-white hover:text-indigo-400 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
