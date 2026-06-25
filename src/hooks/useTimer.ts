import { useState, useEffect, useRef } from 'react';

export type TimerMode = 'focus' | 'break';

export const useTimer = (initialFocusTime: number = 25, initialBreakTime: number = 5) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [focusTime, setFocusTime] = useState(initialFocusTime);
  const [breakTime, setBreakTime] = useState(initialBreakTime);
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
    }
  }, [focusTime, breakTime, mode, isActive]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft(nextMode === 'focus' ? focusTime * 60 : breakTime * 60);
      setIsActive(false); // Pause on switch
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, focusTime, breakTime]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? focusTime * 60 : breakTime * 60);
  };
  const skip = () => {
    setIsActive(false);
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    setMode(nextMode);
    setTimeLeft(nextMode === 'focus' ? focusTime * 60 : breakTime * 60);
  };

  return { 
    timeLeft, 
    isActive, 
    mode, 
    toggle, 
    reset, 
    skip,
    focusTime,
    setFocusTime,
    breakTime,
    setBreakTime
  };
};
