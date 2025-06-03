import React from 'react';
import formStyles from '../../../assets/css/common/Form.module.css';
import buttonStyles from '../../../assets/css/common/Button.module.css';
import styles from '../../../assets/css/dashboard/PomodoroTimer.module.css';

interface TimerSettingsProps {
  currentVolume: number;
  soundEnabled: boolean;
  currentSound: string;
  onClose: () => void;
  onVolumeChange: (value: number) => void;
  onToggleSound: (enabled: boolean) => void;
  onSoundChange: (src: string) => void;
}

const soundOptions = [
  { label: 'Shooting Star', value: '/assets/audio/Shooting-Star.mp3' },
  { label: 'Night Sky', value: '/assets/audio/Night-Sky.mp3' },
  { label: 'Sunrise', value: '/assets/audio/Sunrise.mp3' },
  { label: 'Space Beats', value: '/assets/audio/Space-Beats.mp3' },
  { label: 'Galaxy Path', value: '/assets/audio/Galaxy-Path.mp3' },
  { label: 'Fallen Star', value: '/assets/audio/Fallen-Star.mp3' }
];

const TimerSettings: React.FC<TimerSettingsProps> = ({
  currentVolume,
  soundEnabled,
  currentSound,
  onClose,
  onVolumeChange,
  onToggleSound,
  onSoundChange
}) => {
  return (
    <div className={styles.settingsModal}>
      <div className={styles.modalContent}>
        <h2>Timer Settings</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="volume">Volume:</label>
        <input
          id="volume"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={currentVolume}
          disabled={!soundEnabled}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className={styles.inputRange}
        />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={(e) => onToggleSound(e.target.checked)}
          className={styles.checkboxStyled}
          style={{ marginRight: '0.5rem' }}
        />

            Enable Sound
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="soundSelect">Sound:</label>
          <select
            id="soundSelect"
            value={currentSound}
            onChange={(e) => onSoundChange(e.target.value)}
            disabled={!soundEnabled}
            className={formStyles.input}
          >
            {soundOptions.map((sound) => (
              <option key={sound.value} value={sound.value}>
                {sound.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onClose}
          className={`${buttonStyles.button} ${buttonStyles.secondary}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimerSettings;
