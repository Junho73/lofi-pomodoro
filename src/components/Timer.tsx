import React from 'react';
import { Play, Pause, SkipForward, Settings } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  mode: 'focus' | 'break';
  toggle: () => void;
  skip: () => void;
  onOpenSettings: () => void;
  totalTime: number; 
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, isActive, mode, toggle, skip, onOpenSettings, totalTime }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const percentage = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  
  const radius = 120;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '400px' }}>
      <button 
        className="btn-icon" 
        onClick={onOpenSettings} 
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '40px' }}
        data-cy="settings-btn"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>

      <div style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
        {mode === 'focus' ? 'Focus Session' : 'Break Time'}
      </div>

      <div style={{ position: 'relative', width: radius * 2, height: radius * 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg height={radius * 2} width={radius * 2} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle
            stroke="var(--glass-border)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: isActive ? 'stroke-dashoffset 1s linear' : 'none' }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div style={{ fontSize: '4.5rem', fontWeight: 300, fontVariantNumeric: 'tabular-nums' }} data-cy="timer-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
        <button className="btn-icon" onClick={toggle} data-cy="toggle-btn" style={{ width: '64px', height: '64px' }}>
          {isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
        </button>
        <button className="btn-icon" onClick={skip} data-cy="skip-btn" style={{ width: '64px', height: '64px' }}>
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
};
