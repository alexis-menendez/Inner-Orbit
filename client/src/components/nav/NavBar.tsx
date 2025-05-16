// File: src/components/nav/NavBar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/common/NavBar.module.css';

const TopNav: React.FC = () => {
  return (
    <nav className="dashboard-nav">
      <div className="nav-title">🌌 Inner Orbit</div>
      <ul className="nav-links">
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/journal" className={({ isActive }) => isActive ? "active" : ""}>Journal</NavLink></li>
        <li><NavLink to="/tracker" className={({ isActive }) => isActive ? "active" : ""}>Tracker</NavLink></li>
      </ul>
    </nav>
  );
};

export default TopNav;
