// File: client/src/components/home/Privacy.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/css/service/PrivacyPolicy.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import logoStyles from '../../assets/css/common/Logo.module.css';
import TransparentStars from '../common/TransparentStars';
import ShootingStar from '../common/ShootingStar';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.privacySection}>
      <TransparentStars /> 
      <ShootingStar /> 
      <div className={styles.privacyCard}>
        <div className={styles.background}>
          <div className={styles.container}>
            <h1 className={logoStyles.title}>
              <span className={logoStyles.titleInner}>inner</span>
              <span className={logoStyles.titleOrbit}>Orbit</span>
            </h1>

            <div className={styles.subtitle}>
              <h2>Privacy Policy</h2>

              <p className={styles.paragraph}>
                <strong className={styles.appName}>InnerOrbit</strong> respects your privacy. This policy explains how we collect, use, and protect your data when you use our app.
              </p>

              <h3>1. Information We Collect</h3>
              <ul className={styles.list}>
                <li><strong>Account info:</strong> First and Last Name, Date of Birth, Username, email, Password</li>
                <li><strong>User content:</strong> Journal and mood entries that you create</li>
                <li><strong>Device info:</strong> IP address, device type, browser</li>
              </ul>

              <h3>2. How We Use Your Data</h3>
              <p className={styles.paragraph}>
                We use your data to operate the app, provide features, troubleshoot issues, and communicate with you. We never sell your data or use it for ads.
              </p>

              <h3>3. Sharing</h3>
              <p className={styles.paragraph}>
                We only share data with service providers who help us run the app (e.g., hosting), or if required by law.
              </p>

              <h3>4. Security</h3>
              <p className={styles.paragraph}>
                We use industry-standard security to protect your data. Still, no system is 100% secure—keep your password safe.
              </p>

              <h3>5. Children’s Privacy</h3>
              <p className={styles.paragraph}>
                Users must be 16+. If under 18, you need a parent or guardian’s permission. We don’t knowingly collect data from users under 16 without consent.
              </p>

              <h3>6. Your Rights</h3>
              <p className={styles.paragraph}>
                You may view, edit, or delete your account at any time.
              </p>

              <h3>7. Updates</h3>
              <p className={styles.paragraph}>
                We may update this policy. We’ll notify you via the app or email. Continued use means you accept the changes.
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate(-1)}
                className={`${buttonStyles.button} ${buttonStyles.senary}`}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
