import React, { useState, useEffect } from 'react';
import { User, Bell, Moon, Sun, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-10 flex items-center justify-between z-10">
      <div className="flex-1 max-w-xl relative hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for ledgers, categories, or insights..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium"
        />
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition-all relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? 'dark' : 'light'}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>

        <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-slate-100 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{user?.name}</p>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Premium Plan</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-black">
            {user?.name?.[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
