// file path: client/src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/common/Button.module.css';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-white bg-gradient-to-b from-indigo-900 to-black">
      <h1 className="text-4xl font-bold tracking-widest">Hello, InnerOrbit 🌌</h1>
      <h2 className="text-2xl font-bold tracking-wider">Welcome to the Home Page</h2>

    <div className="flex flex-col w-full max-w-md mt-6 sm:flex-row">
      <Link
        to="/login"
        className={`${styles.button} ${styles.primary} ${styles.spaced}`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`${styles.button} ${styles.secondary}`}
      >
        Register
      </Link>
    </div>
    </div>
  );
};

export default Home;


