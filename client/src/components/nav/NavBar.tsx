// File: src/components/nav/NavBar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../assets/css/layout/NavBar.module.css'; // ✅ fixed the path

const NavBar: React.FC = () => {
  return (
    <nav className={styles.dashboardNav}>
      <div className={styles.navTitle}>🌌 Inner Orbit</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/journal"
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Journal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracker"
            className={({ isActive }) => isActive ? styles.active : undefined}
          >
            Tracker
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
