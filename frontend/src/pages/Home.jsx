import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, PieChart, Shield, Zap, ArrowRight, Wallet, 
  CheckCircle, BarChart3, Lock, Users, ArrowUpRight, Globe, Layers
} from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="group p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 backdrop-blur-sm"
  >
    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
  </motion.div>
);

const Stat = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-3xl font-black text-white mb-1">{value}</span>
    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-2xl border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/40"
            >
              <Wallet size={24} />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">SpendWise</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#preview" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Dashboard</a>
            <a href="#pricing" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="px-8 py-3 text-sm font-bold bg-white text-black rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-10"
          >
            <Zap size={14} className="animate-pulse" /> New: AI-Powered Insights Available
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] text-white"
          >
            SMART <br />
            <span className="bg-gradient-to-b from-indigo-400 via-indigo-600 to-indigo-900 bg-clip-text text-transparent italic">SPENDING.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
          >
            The definitive platform for modern wealth management. Track, analyze, and optimize your finances with absolute precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/signup" className="w-full sm:w-auto px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-500 shadow-2xl shadow-indigo-600/40 transition-all flex items-center justify-center gap-3 group">
              Start Free Today <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex gap-12 sm:ml-8 mt-8 sm:mt-0">
              <Stat label="Active Users" value="12K+" />
              <Stat label="Transactions" value="2.4M+" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="preview" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
              alt="Dashboard Preview" 
              className="rounded-[2.5rem] w-full shadow-2xl grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
            />
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-12 left-12 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl hidden lg:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Savings Rate</div>
                  <div className="text-2xl font-black text-white">+24.5%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">Everything you need <br />to master your money.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Powerful tools designed for both casual savers and financial experts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BarChart3} 
              title="Real-time Analytics" 
              desc="Visualize your spending patterns with high-fidelity charts that update as you spend."
              delay={0.1}
            />
            <FeatureCard 
              icon={PieChart} 
              title="Budget Control" 
              desc="Set granular limits for every category. Get notified before you overspend."
              delay={0.2}
            />
            <FeatureCard 
              icon={Lock} 
              title="Military-grade Security" 
              desc="Your financial data is encrypted with AES-256 and protected by biometric-ready auth."
              delay={0.3}
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Currency" 
              desc="Support for over 150+ currencies with real-time exchange rate updates."
              delay={0.4}
            />
            <FeatureCard 
              icon={Layers} 
              title="Smart Tags" 
              desc="Automatically categorize transactions using our proprietary AI tagging engine."
              delay={0.5}
            />
            <FeatureCard 
              icon={Users} 
              title="Shared Wallets" 
              desc="Manage household expenses together with real-time sync across all devices."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[4rem] bg-indigo-600 p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/20 blur-[100px] rounded-full"
          />
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 relative z-10 leading-[0.9]">Ready to achieve <br />financial freedom?</h2>
          <Link to="/signup" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-indigo-600 rounded-full font-black text-xl hover:scale-105 transition-transform relative z-10">
            Join 12,000+ Users <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Wallet size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">SpendWise</span>
            </div>
            <p className="text-slate-500 max-w-sm text-lg leading-relaxed">
              Making financial intelligence accessible to everyone. Built with precision and privacy at its core.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2026 SpendWise // Engineered for Excellence
        </div>
      </footer>
    </div>
  );
};

export default Home;
