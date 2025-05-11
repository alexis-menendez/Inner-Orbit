// file: client/src/pages/Privacy.tsx

import React from 'react';

const Privacy = () => (
  <section className="min-h-screen px-6 py-12 bg-white text-gray-800">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        <strong>[Your App Name]</strong> (“we,” “us,” or “our”) respects your privacy. This policy explains how we collect, use, and protect your data when you use our mental wellness app.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Account info:</strong> Username, email, encrypted password</li>
        <li><strong>User content:</strong> Journals, moods, entries you create</li>
        <li><strong>Device info:</strong> IP address, device type, browser</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <p className="mb-4">We use your data to operate the app, provide features, troubleshoot issues, and communicate with you. We never sell your data or use it for ads.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing</h2>
      <p className="mb-4">We only share data with service providers who help us run the app (e.g., hosting), or if required by law.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Security</h2>
      <p className="mb-4">We use industry-standard security to protect your data. Still, no system is 100% secure—keep your password safe.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Children’s Privacy</h2>
      <p className="mb-4">Users must be 16+. If under 18, you need a parent or guardian’s permission. We don’t knowingly collect data from users under 16 without consent.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">You may view, edit, or delete your account at any time. Contact us at <a href="mailto:support@yourapp.com" className="underline text-indigo-600">support@yourapp.com</a>.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Updates</h2>
      <p className="mb-4">We may update this policy. We’ll notify you via the app or email. Continued use means you accept the changes.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p>
        For privacy-related questions, contact us at <a href="mailto:support@yourapp.com" className="underline text-indigo-600">support@yourapp.com</a>.
      </p>
    </div>
  </section>
);

export default Privacy;
