// File: client/src/components/tracker/MoodComboBox.tsx

import React, { useState, useRef, useEffect } from 'react';
import formStyles from '../../assets/css/common/Form.module.css';

interface MoodComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  moodList: { id: string; label: string }[];
  required?: boolean;
}

const MoodComboBox: React.FC<MoodComboBoxProps> = ({ value, onChange, moodList, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredList, setFilteredList] = useState(moodList);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const search = value.toLowerCase();
    setFilteredList(
      moodList.filter(m =>
        m.label.toLowerCase().includes(search) || m.id.toLowerCase().includes(search)
      )
    );
  }, [value, moodList]);

  return (
    <div
      ref={containerRef}
      className={formStyles.inputWrapper}
      style={{ position: 'relative', width: '100%' }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className={formStyles.input}
        placeholder="Type or select a mood"
        required={required}
        style={{
          width: '100%',
          display: 'block',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      />

      {isOpen && filteredList.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#1e1e1e',
            border: '1px solid #555',
            borderRadius: '4px',
            zIndex: 1000,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            width: '100%',
          }}
        >
          {filteredList.map((m) => (
            <li
              key={m.id}
              onClick={() => {
                onChange(m.id);
                setIsOpen(false);
              }}
              onMouseDown={(e) => e.preventDefault()} // prevent input blur
              style={{
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {m.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodComboBox;
