"use client";
import React, { useState, useEffect } from 'react';

const quizStyles = `
  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
  }
  .quiz-step { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .ai-glow { animation: pulseGlow 2s infinite; }
`;

export default function AutoBuilderQuiz({ inventory, onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answers, setAnswers] = useState({ useCase: '', budget: 1, aesthetic: '' });

  const questions = [
    {
      title: "What is your primary goal?",
      key: "useCase",
      options: [
        { label: "Hardcore Gaming", icon: "🎮", value: "gaming" },
        { label: "Content Creation / 3D", icon: "🎨", value: "creator" },
        { label: "Office & Browsing", icon: "💻", value: "office" }
      ]
    },
    {
      title: "What is your budget level?",
      key: "budget",
      options: [
        { label: "Entry Level (1080p)", icon: "🥉", value: 1 },
        { label: "Mid-Tier (1440p)", icon: "🥈", value: 2 },
        { label: "Enthusiast (4K+)", icon: "🥇", value: 4 }
      ]
    },
    {
      title: "Choose your aesthetic",
      key: "aesthetic",
      options: [
        { label: "Stealth Black", icon: "⬛", value: "black" },
        { label: "Snow White", icon: "⬜", value: "white" },
        { label: "Maximum RGB", icon: "🌈", value: "rgb" }
      ]
    }
  ];

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(15);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(prev => prev + 1), 300);
    } else {
      triggerAnalysis();
    }
  };

  const triggerAnalysis = () => {
    setIsAnalyzing(true);
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate([20, 100, 20, 100, 20]);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const generatedBuild = generateSmartBuild();
      onComplete(generatedBuild);
    }, 2500);
  };

  const generateSmartBuild = () => {
    const build = [];
    const multiplier = answers.budget;

    // Smart logic to pick the best parts under a calculated price ceiling
    const pickItem = (category, maxPrice) => {
      const items = inventory.filter(i => i.category === category);
      if (!items.length) return null;
      
      items.sort((a, b) => a.price - b.price);
      let picked = items.reverse().find(i => i.price <= maxPrice);
      return picked || items[items.length - 1]; // Fallback to cheapest if none match
    };

    build.push(pickItem('CPUs', 250 * multiplier));
    build.push(pickItem('GPUs', 450 * multiplier));
    build.push(pickItem('Motherboards', 180 * multiplier));
    build.push(pickItem('RAM', 120 * multiplier));
    build.push(pickItem('Storage', 120 * multiplier));
    build.push(pickItem('Power Supplies', 150 * multiplier));
    build.push(pickItem('PC Cases', 150 * multiplier));

    return build.filter(Boolean).map(item => ({ ...item, quantity: 1 }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <style dangerouslySetInnerHTML={{ __html: quizStyles }} />
      <div className="bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700 relative text-white">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold z-20">&times;</button>

        {isAnalyzing ? (
          <div className="p-12 flex flex-col items-center justify-center text-center quiz-step min-h-[400px]">
            <div className="w-24 h-24 mb-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin ai-glow"></div>
            <h2 className="text-2xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI is drafting your build...
            </h2>
            <p className="text-gray-400 text-sm font-medium">Cross-checking wattage and socket compatibility...</p>
          </div>
        ) : (
          <div className="p-6 md:p-10 quiz-step min-h-[400px] flex flex-col">
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-2 block">Step {step + 1} of 3</span>
            <h2 className="text-2xl md:text-3xl font-black mb-8">{questions[step].title}</h2>
            
            <div className="flex flex-col gap-3 flex-1 justify-center">
              {questions[step].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSelect(questions[step].key, opt.value)}
                  className="w-full bg-gray-800 hover:bg-indigo-600 border border-gray-700 hover:border-indigo-400 text-left p-4 md:p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 group active:scale-95"
                >
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                  <span className="font-bold text-lg md:text-xl text-gray-100 group-hover:text-white">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}