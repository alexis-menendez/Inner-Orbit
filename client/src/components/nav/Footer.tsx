// File: client/src/components/nav/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-sm text-center text-gray-400">
      <p>
        © {new Date().getFullYear()} InnerOrbit.{' '}
        <a href="/terms" className="underline hover:text-gray-600">Terms</a> |{' '}
        <a href="/privacy" className="underline hover:text-gray-600">Privacy</a>
      </p>
    </footer>
  );
};

export default Footer;
