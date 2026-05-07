import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Calendar, Info } from 'lucide-react';
import api from '../services/api';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/transactions');
      const transactions = res.data;

      // Prepare Bar Chart Data (Monthly)
      const monthly = transactions.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
        if (t.type === 'income') acc[month].income += t.amount;
        else acc[month].expense += t.amount;
        return acc;
      }, {});
      setData(Object.values(monthly).reverse());

      // Prepare Category Data
      const categories = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
        if (!acc[t.category]) acc[t.category] = 0;
        acc[t.category] += t.amount;
        return acc;
      }, {});
      setCategoryData(Object.entries(categories).map(([name, value]) => ({ name, value })));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Synthesizing Financial Intelligence...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      <header>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">Market Intelligence</h1>
        <p className="text-slate-500 font-medium text-lg">Visual deep-dives into your fiscal ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Flow */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-indigo-600" size={24} />
              <h3 className="text-2xl font-black tracking-tight">Monthly Magnitude</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Calendar size={12} /> FY 2026
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px'}}
                />
                <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="expense" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <PieChartIcon className="text-violet-600" size={24} />
              <h3 className="text-2xl font-black tracking-tight">Category Vectors</h3>
            </div>
            <Info size={16} className="text-slate-300" />
          </div>

          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Spend</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                ${categoryData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spending Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-600 to-violet-700 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl">
                <TrendingUp size={24} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em]">Smart Insight</span>
            </div>
            <h2 className="text-5xl font-black tracking-tight mb-6 leading-[0.9]">Master Your <br />Financial Velocity.</h2>
            <p className="text-indigo-100 text-lg font-medium max-w-md opacity-80">
              Your average daily spend has decreased by 12% compared to last month. Keep up this momentum to reach your savings goal faster.
            </p>
          </div>
          <div className="flex justify-end">
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              Optimize Budget
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
