import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, academic details, and uploaded documents when you register
            or apply for scholarships on our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            The collected information is used to process scholarship
            applications, communicate updates, improve our services, and ensure
            a smooth and transparent application experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Data Security
          </h2>
          <p>
            We implement strict security measures to protect your data from
            unauthorized access, loss, or misuse. All sensitive information is
            securely stored and encrypted.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Sharing of Information
          </h2>
          <p>
            We do not sell or share your personal information with third parties
            except when required for scholarship evaluation or by law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Cookies & Tracking
          </h2>
          <p>
            Our website may use cookies to enhance user experience, analyze
            traffic, and personalize content. You can control cookie settings
            through your browser.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or request deletion of your
            personal information. For any privacy-related requests, please
            contact our support team.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
