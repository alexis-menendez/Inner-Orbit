// File: client/src/components/layout/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import StarBackground from '../common/StarBackground';

const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a0029] text-white relative overflow-hidden">
      <StarBackground />
      <main className="relative z-10 min-h-screen px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
