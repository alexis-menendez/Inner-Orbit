import React from "react";
import styles from "../../assets/css/service/terms.module.css";

const Terms = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: May 19, 2025</p>

        <p>
          Welcome to <strong>innerOrbit</strong>! These Terms of Service (the
          "Terms") govern your use of our website and services. By accessing or
          using our service, you agree to comply with these Terms. If you do not
          agree with any part of these Terms, please do not use our services.
        </p>
        <h2> 1. Eligibility</h2>
        <p>        
          You must be at least 16 years old to use the app. If you're under 18,
          you must have a parent or guardian’s permission.
        </p>
        <h2>2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate
          information. You are responsible for safeguarding your account and for
          all activities under your account. Please see our{" "}
          <a href="/privacy">Privacy Policy</a> for information on how we handle
          your personal data.
        </p>
        <h2>3. Mental Health Disclaimer</h2>
        <p>
          Our app provides tools for reflection and mindfulness. It does not
          offer medical advice or replace professional care. If you’re in
          crisis, seek help from a licensed provider or emergency services.
        </p>

        <h2>4. Termination of Service</h2>
        <p>
          We reserve the right to suspend or terminate your access if you
          violate these Terms or engage in unlawful behavior. We may also
          terminate the service with prior notice if necessary. Upon
          termination, your right to use the service will cease immediately.
        </p>
<h2> 5. User Conduct</h2>
 <p>
        You agree not to misuse the app, share harmful content, or violate laws.
      </p>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at{" "}
          <a href="mailto:support@cosmicapp.com">support@cosmicapp.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;
