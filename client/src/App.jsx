import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Outlet /> {/* This renders the current route's component */}
        <div className="text-3xl text-pink-500 font-bold text-center mt-10">
        Tailwind is working!
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
