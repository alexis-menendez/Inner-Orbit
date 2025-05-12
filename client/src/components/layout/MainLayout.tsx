// File: client/src/components/layout/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../assets/css/common/CosmicBackground.module.css';

const MainLayout: React.FC = () => {
  return (
    <div className={`w-full min-h-screen ${styles['cosmic-background']}`}>
      {/* Optional: Add <Navbar /> here later */}
      <main className="min-h-screen px-4 py-6 text-white">
        <Outlet />
        <div className="mt-10 text-3xl font-bold text-center text-pink-500">
          Tailwind is working!
        </div>
      </main>
      {/* Optional: Add <Footer /> here later */}
    </div>
  );
};

export default MainLayout;
