// file path: client/src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import buttonStyles from '../assets/css/common/Button.module.css';
import styles from '../assets/css/common/Logo.module.css'; 

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center gap-6 text-white">
      <h1 className={styles.title}>
        <span className={styles.titleInner}>inner</span>
        <span className={styles.titleOrbit}>Orbit</span>
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-md mt-6 gap-4">
        <Link to="/login" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.spaced}`}>
          Login
        </Link>
        <Link to="/register" className={`${buttonStyles.button} ${buttonStyles.secondary}`}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;


