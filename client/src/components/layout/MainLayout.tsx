import React from 'react';
import { Outlet } from 'react-router-dom';
import StarBackground from '../common/StarBackground';
import MainLayoutBackground from '../common/MainLayoutBackground';
import NavBar from '../nav/NavBar';
import Footer from '../nav/Footer';
import styles from '../../assets/css/common/MainLayoutBackground.module.css'; // ✅ Correct import

const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a0029] text-white relative overflow-hidden">
      <StarBackground />
      <MainLayoutBackground />

      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <div className={styles['gradient-overlay']}>
          <NavBar />
          <main className="w-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
