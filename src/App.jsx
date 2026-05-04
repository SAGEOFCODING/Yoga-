import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AssessmentForm from './components/AssessmentForm';

import DashboardPage from './pages/DashboardPage';
import MeditationPage from './pages/MeditationPage';
import NutritionPage from './pages/NutritionPage';
import ExercisePage from './pages/ExercisePage';

import AuthPage from './components/AuthPage';
import Chatbot from './components/Chatbot';

import './index.css';

function App() {
  const { isAssessed, step, setStep, activePage, isLoggedIn } = useStore();

  const handleStart = () => setStep(1);

  if (!isLoggedIn) return <AuthPage />;

  return (
    <div className="App" style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <Navbar />
      
      <AnimatePresence mode="wait">
        {!isAssessed && step === 0 && (
          <LandingPage key="landing" onStart={handleStart} />
        )}

        {!isAssessed && step > 0 && (
          <AssessmentForm key="form" />
        )}

        {isAssessed && (
          <>
            {activePage === 'dashboard' && <DashboardPage key="dashboard" />}
            {activePage === 'meditation' && <MeditationPage key="meditation" />}
            {activePage === 'nutrition' && <NutritionPage key="nutrition" />}
            {activePage === 'exercise' && <ExercisePage key="exercise" />}
          </>
        )}
      </AnimatePresence>
      <Chatbot />
    </div>
  );
}

export default App;
