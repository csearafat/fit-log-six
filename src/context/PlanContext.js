'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage থেকে প্ল্যান ডাটা লোড করা
  useEffect(() => {
    try {
      const localData = localStorage.getItem('fitlog_my_plan');
      if (localData) {
        setSavedWorkouts(JSON.parse(localData));
      }
    } catch (error) {
      console.error('Failed to parse saved plan:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // LocalStorage-এ ডাটা সেভ করা
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_my_plan', JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  // প্ল্যানে ওয়ার্কআউট যোগ করা
  const addToPlan = (workout) => {
    const exists = savedWorkouts.some((item) => item.id === workout.id);
    if (exists) {
      toast.warn('This workout is already in your plan!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success('Added to your Workout Plan!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return true;
  };

  // প্ল্যান থেকে ওয়ার্কআউট রিমুভ করা
  const removeFromPlan = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.error('Removed from your Workout Plan!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // প্ল্যান ক্লিয়ার করা
  const clearPlan = () => {
    setSavedWorkouts([]);
    toast.info('Workout Plan cleared!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <PlanContext.Provider
      value={{
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        clearPlan,
        isLoaded,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};