// File: client/src/components/layout/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../assets/css/common/CosmicBackground.module.css';
import StarBackground from '../common/StarBackground';

const MainLayout: React.FC = () => {
  return (
    <div className={`w-full min-h-screen ${styles['cosmic-background']} relative overflow-hidden`}>
      <StarBackground />

      <main className="relative z-10 min-h-screen px-4 py-6 text-white">
        <Outlet />
        <div className="mt-10 text-3xl font-bold text-center text-pink-500">
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
