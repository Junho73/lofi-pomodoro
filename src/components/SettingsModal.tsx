import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusTime: number;
  breakTime: number;
  onSave: (focus: number, breakTime: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, focusTime, breakTime, onSave }) => {
  const [focusInput, setFocusInput] = useState(focusTime.toString());
  const [breakInput, setBreakInput] = useState(breakTime.toString());

  useEffect(() => {
    setFocusInput(focusTime.toString());
    setBreakInput(breakTime.toString());
  }, [focusTime, breakTime, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const focusVal = parseInt(focusInput, 10);
    const breakVal = parseInt(breakInput, 10);
    if (!isNaN(focusVal) && !isNaN(breakVal) && focusVal > 0 && breakVal > 0) {
      onSave(focusVal, breakVal);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
    }}>
      <div className="glass-panel" style={{ 
        width: '100%', maxWidth: '360px', 
        background: 'rgba(255, 255, 255, 0.95)', color: '#333',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Timer Settings</h2>
          <button onClick={onClose} data-cy="settings-close-btn" style={{ color: '#666' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Focus Time (minutes)</label>
          <input 
            type="number" 
            value={focusInput} 
            onChange={e => setFocusInput(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
            data-cy="focus-time-input"
            min="1"
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Break Time (minutes)</label>
          <input 
            type="number" 
            value={breakInput} 
            onChange={e => setBreakInput(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
            data-cy="break-time-input"
            min="1"
          />
        </div>

        <button 
          onClick={handleSave} 
          data-cy="settings-save-btn"
          style={{ 
            width: '100%', padding: '14px', background: 'var(--color-primary)', 
            color: 'white', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
            transition: 'background 0.2s'
          }}>
          Save Settings
        </button>
      </div>
    </div>
  );
};
