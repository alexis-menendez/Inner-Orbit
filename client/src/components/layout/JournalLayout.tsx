// File: client/src/components/layout/JournalLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import NavBar from '../nav/NavBar';

const JournalLayout: React.FC = () => {
  return (
    <>
      <div
        className="w-full min-h-screen text-white relative overflow-hidden"
        style={{ backgroundColor: 'transparent' }}
      >
        <StarBackground />

        <div className="relative z-10 flex flex-col items-center min-h-screen">
          {/* Leave NavBar untouched to use full width */}
          <NavBar />

          {/* Only pad the main content */}
          <main className="w-full pt-12 pl-6 md:pl-12 lg:pl-20 xl:pl-32 2xl:pl-40">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default JournalLayout;
