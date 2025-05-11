// file path: client/src/pages/Terms.tsx

import React from 'react';

const Terms = () => (
  <section className="min-h-screen px-6 py-12 bg-white text-gray-800">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        Welcome to <strong>[Your App Name]</strong> (“we,” “our,” or “us”), a mental wellness app designed to support emotional well-being through journaling, mindfulness tools, and mood tracking.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="mb-4">
        You must be at least <strong>16 years old</strong> to use this app. If you are under 18, you must have a parent or guardian's permission. By using the app, you confirm that you meet these requirements.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Mental Health Disclaimer</h2>
      <p className="mb-4">
        This app does not provide medical advice, diagnosis, or treatment. It is not a replacement for professional mental health support. If you're in crisis, contact a licensed therapist or emergency services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Conduct</h2>
      <p className="mb-4">You agree not to misuse the app or post harmful, abusive, or inappropriate content.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Privacy and Data</h2>
      <p className="mb-4">Your data is protected under our <a href="/privacy" className="underline text-indigo-600">Privacy Policy</a>.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Account Security</h2>
      <p className="mb-4">You are responsible for safeguarding your account. Notify us if you suspect unauthorized use.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Modifications</h2>
      <p className="mb-4">We may update these terms. Continued use of the app means you agree to the latest version.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Termination</h2>
      <p className="mb-4">We may suspend or terminate accounts that violate these terms.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p>
        Questions? Contact us at <a href="mailto:support@yourapp.com" className="underline text-indigo-600">support@yourapp.com</a>.
      </p>
    </div>
  </section>
);

export default Terms;


