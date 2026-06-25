import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { TodoList } from './components/TodoList';
import { SettingsModal } from './components/SettingsModal';
import { useTimer } from './hooks/useTimer';

function App() {
  const { 
    timeLeft, isActive, mode, toggle, skip, reset, 
    focusTime, setFocusTime, breakTime, setBreakTime 
  } = useTimer(25, 5);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSaveSettings = (newFocus: number, newBreak: number) => {
    setFocusTime(newFocus);
    setBreakTime(newBreak);
    // Timer auto resets on focus/break time change in the hook if not active, 
    // but let's be explicit if we want a full reset.
    reset();
  };

  const bgColors = mode === 'focus' 
    ? { top: '#ff7b54', bottom: '#ffd56b', primary: '#ff5722' } // Sunset Orange
    : { top: '#4facfe', bottom: '#00f2fe', primary: '#0088cc' }; // Cool Blue for break

  useEffect(() => {
    document.documentElement.style.setProperty('--color-bg-top', bgColors.top);
    document.documentElement.style.setProperty('--color-bg-bottom', bgColors.bottom);
    document.documentElement.style.setProperty('--color-primary', bgColors.primary);
  }, [mode, bgColors.top, bgColors.bottom, bgColors.primary]);

  return (
    <div className="app-layout">
      <Timer 
        timeLeft={timeLeft}
        isActive={isActive}
        mode={mode}
        toggle={toggle}
        skip={skip}
        onOpenSettings={() => setIsSettingsOpen(true)}
        totalTime={mode === 'focus' ? focusTime * 60 : breakTime * 60}
      />
      <TodoList />
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        focusTime={focusTime}
        breakTime={breakTime}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App;
