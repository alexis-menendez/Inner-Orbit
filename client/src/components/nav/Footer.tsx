// File: client/src/components/nav/Footer.tsx

import React from 'react';
import { useAuth } from '../../context/authContext';
import styles from '../../assets/css/layout/NavBar.module.css';

const Footer: React.FC = () => {
  const { logout } = useAuth();

  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} InnerOrbit.{' '}
        <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
      </p>
      <div className={styles.logoutFooterWrapper}>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </footer>
  );
};

export default Footer;
