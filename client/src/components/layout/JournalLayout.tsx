// File: client/src/components/layout/JournalLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import ShootingStar from '../common/ShootingStar';
import NavBar from '../nav/NavBar';
import Footer from '../nav/Footer';

const JournalLayout: React.FC = () => {
  return (
    <>
      <div
        className="w-full min-h-screen text-white relative overflow-hidden"
        style={{ backgroundColor: 'transparent' }}
      >
        <StarBackground />

        <div className="relative z-10 flex flex-col items-center min-h-screen">
          <NavBar />
          <main className="w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default JournalLayout;
