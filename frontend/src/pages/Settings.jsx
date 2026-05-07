import React, { useState, useEffect } from 'react';
import { Shield, Bell, CreditCard, Save } from 'lucide-react';
import api from '../services/api';

const Settings = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: 'Food', amount: '' });
  const [loading, setLoading] = useState(true);

  const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Rent', 'Entertainment', 'Other'];

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await api.get('/budgets');
      setBudgets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBudget = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newBudget,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      };
      await api.post('/budgets', payload);
      fetchBudgets();
      setNewBudget({ category: 'Food', amount: '' });
      alert('Budget updated successfully');
    } catch (err) {
      alert('Error saving budget');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-slate-500 text-sm">Configure your personal preferences and limits</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="text-sky-500" size={24} />
            <h3 className="text-lg font-bold">Category Budgets</h3>
          </div>
          
          <form onSubmit={handleSaveBudget} className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-0 rounded-2xl outline-none"
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Limit ($)</label>
              <input
                type="number"
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-0 rounded-2xl outline-none"
                placeholder="500.00"
                value={newBudget.amount}
                onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              />
            </div>
            <div className="sm:pt-8">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} /> Update
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Limits</h4>
            {budgets.map((b) => (
              <div key={b._id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                <span className="font-bold text-slate-700 dark:text-slate-200">{b.category}</span>
                <span className="font-mono font-bold text-sky-600">${b.amount}</span>
              </div>
            ))}
            {budgets.length === 0 && (
              <p className="text-center py-6 text-slate-400 text-sm">No budgets set yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-indigo-500" size={24} />
            <h3 className="text-lg font-bold">Security & Privacy</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Secure your account with an extra layer</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Public Profile</p>
                <p className="text-xs text-slate-500">Allow others to see your spending stats</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
