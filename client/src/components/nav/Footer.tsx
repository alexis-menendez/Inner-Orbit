// File: client/src/components/nav/Footer.tsx

import React from 'react';
import { useAuth } from '../../context/authContext';
import styles from '../../assets/css/layout/NavBar.module.css';

const Footer: React.FC = () => {
  const { logout } = useAuth();

  return (
    <footer className={styles.footer}>
      <p>
        <span>
          <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
        </span>
        <br />
        <span style={{ marginTop: '0.9rem', display: 'inline-block' }}>
          © {new Date().getFullYear()} innerOrbit
        </span>
      </p>
    </footer>
  );
};

export default Footer;
