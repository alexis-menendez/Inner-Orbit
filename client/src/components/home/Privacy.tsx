// File: client/src/components/home/Privacy.tsx

import React from 'react';
import styles from '../../assets/css/service/PrivacyPolicy.module.css'; 

const Privacy = () => (
  <section className={styles.privacySection}>
    <div className={styles.privacyCard}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.subtitle}>Effective Date: <span className={styles.italic}>[Insert Date]</span></p>

      <p className={styles.paragraph}>
        <strong className={styles.appName}>[Your App Name]</strong> (“we,” “us,” or “our”) respects your privacy. This policy explains how we collect, use, and protect your data when you use our mental wellness app.
      </p>

      <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
      <ul className={styles.list}>
        <li><strong>Account info:</strong> Username, email, encrypted password</li>
        <li><strong>User content:</strong> Journals, moods, entries you create</li>
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
      <p className={styles.paragraph}>
        You may view, edit, or delete your account at any time. Contact us at{' '}
        <a href="mailto:support@yourapp.com" className={styles.link}>support@yourapp.com</a>.
      </p>

      <h2 className={styles.sectionHeading}>7. Updates</h2>
      <p className={styles.paragraph}>We may update this policy. We’ll notify you via the app or email. Continued use means you accept the changes.</p>

      <h2 className={styles.sectionHeading}>8. Contact</h2>
      <p className={styles.paragraph}>
        For privacy-related questions, contact us at{' '}
        <a href="mailto:support@yourapp.com" className={styles.link}>support@yourapp.com</a>.
      </p>
    </div>
  </section>
);

export default Privacy;
