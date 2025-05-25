// File: client/src/components/home/Privacy.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/service/PrivacyPolicy.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.privacySection}>
      <div className={styles.privacyCard}>
        <h1 className={styles.title}>Privacy Policy</h1>

        <p className={styles.paragraph}>
          <strong className={styles.appName}>InnerOrbit</strong> respects your privacy. This policy explains how we collect, use, and protect your data when you use our app.
        </p>

        <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
        <ul className={styles.list}>
          <li><strong>Account info:</strong> First and Last Name, Date of Birth, Username, email, Password</li>
          <li><strong>User content:</strong> Journal and mood entries that you create</li>
          <li><strong>Device info:</strong> IP address, device type, browser</li>
        </ul>

        <h2 className={styles.sectionHeading}>2. How We Use Your Data</h2>
        <p className={styles.paragraph}>We use your data to operate the app, provide features, troubleshoot issues, and communicate with you. We never sell your data or use it for ads.</p>

        <h2 className={styles.sectionHeading}>3. Sharing</h2>
        <p className={styles.paragraph}>We only share data with service providers who help us run the app (e.g., hosting), or if required by law.</p>

        <h2 className={styles.sectionHeading}>4. Security</h2>
        <p className={styles.paragraph}>We use industry-standard security to protect your data. Still, no system is 100% secure—keep your password safe.</p>

        <h2 className={styles.sectionHeading}>5. Children’s Privacy</h2>
        <p className={styles.paragraph}>Users must be 16+. If under 18, you need a parent or guardian’s permission. We don’t knowingly collect data from users under 16 without consent.</p>

        <h2 className={styles.sectionHeading}>6. Your Rights</h2>
        <p className={styles.paragraph}>You may view, edit, or delete your account at any time.</p>

        <h2 className={styles.sectionHeading}>7. Updates</h2>
        <p className={styles.paragraph}>We may update this policy. We’ll notify you via the app or email. Continued use means you accept the changes.</p>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
