import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Clock, ArrowUpRight, Plus, Activity } from 'lucide-react';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, amount, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.03] rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700`} />
    
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Live Update</span>
        <Activity size={12} className="text-indigo-500 animate-pulse" />
      </div>
    </div>
    
    <div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
        ${amount.toLocaleString()}
      </h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [summaryRes, transRes] = await Promise.all([
        api.get('/transactions/insights'),
        api.get('/transactions'),
      ]);
      setSummary(summaryRes.data);
      setRecentTransactions(transRes.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Income', value: summary.income },
    { name: 'Expense', value: summary.expense },
  ];
  const COLORS = ['#6366f1', '#f43f5e'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Orchestrating Data...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">Financial Overview</h1>
          <p className="text-slate-500 font-medium">Tracking your prosperity, one transaction at a time.</p>
        </div>
        <button 
          onClick={() => navigate('/transactions', { state: { openModal: true } })}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={20} /> Add Transaction
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Net Balance" amount={summary.balance} icon={Wallet} color="from-indigo-500 to-violet-600" delay={0.1} />
        <StatCard title="Total Income" amount={summary.income} icon={TrendingUp} color="from-emerald-400 to-teal-500" delay={0.2} />
        <StatCard title="Monthly Spend" amount={summary.expense} icon={TrendingDown} color="from-rose-400 to-pink-500" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Clock className="text-indigo-500" size={24} />
              <h3 className="text-2xl font-black tracking-tight">Recent Ledger</h3>
            </div>
            <button 
              onClick={() => navigate('/transactions')}
              className="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              History View
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((tx, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (idx * 0.05) }}
                key={tx._id} 
                className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${
                    tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
                  }`}>
                    {tx.category[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{tx.description || tx.category}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`text-xl font-black ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </p>
                  <ArrowUpRight size={16} className="text-slate-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cash Flow Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 bg-indigo-600 dark:bg-indigo-950 p-10 rounded-[2.5rem] shadow-xl shadow-indigo-600/20 text-white flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <h3 className="text-2xl font-black tracking-tight mb-10 w-full relative z-10">Cash Distribution</h3>
          <div className="w-full h-72 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-4 w-full mt-6 relative z-10">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">Income Share</span>
              <span className="text-xl font-black">{Math.round((summary.income / (summary.income + summary.expense || 1)) * 100)}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl backdrop-blur-md">
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">Expense Share</span>
              <span className="text-xl font-black">{Math.round((summary.expense / (summary.income + summary.expense || 1)) * 100)}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
