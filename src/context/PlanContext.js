'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // localStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog_plan');
    const storedSaved = localStorage.getItem('fitlog_saved');
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Plan-এ যুক্ত করার লজিক
  const addToPlan = (workout) => {
    const exists = plan.some((item) => (item.id || item._id) === (workout.id || workout._id));
    if (exists) {
      showToast('⚠️ Already added to Today\'s Plan!');
      return;
    }
    const updated = [...plan, workout];
    setPlan(updated);
    localStorage.setItem('fitlog_plan', JSON.stringify(updated));
    showToast('✅ Added to Today\'s Plan!');
  };

  // Saved-এ যুক্ত করার লজিক
  const addToSaved = (workout) => {
    const exists = saved.some((item) => (item.id || item._id) === (workout.id || workout._id));
    if (exists) {
      showToast('⚠️ Already Saved for later!');
      return;
    }
    const updated = [...saved, workout];
    setSaved(updated);
    localStorage.setItem('fitlog_saved', JSON.stringify(updated));
    showToast('🔖 Saved for later!');
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        planCount: plan.length,
        savedCount: saved.length,
      }}
    >
      {children}

      {/* Toast Alert Message Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#1a1d26] border border-[#c2f970] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-2xl z-50 animate-bounce">
          {toastMessage}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}