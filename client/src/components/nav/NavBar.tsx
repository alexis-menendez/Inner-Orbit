// File: src/components/nav/NavBar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from '../../assets/css/layout/NavBar.module.css'; 

const NavBar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className={styles.dashboardNav}>
      <div className={styles.navTitle}>
        <span className={styles.inner}>inner</span>
        <span className={styles.orbit}>Orbit</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/journal"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Journal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracker"
            className={({ isActive }) => isActive ? `${styles.navLinkItem} ${styles.active}` : styles.navLinkItem}
          >
            Tracker
          </NavLink>
        </li>
        <li>
          <button className={styles.navLinkItem} onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
