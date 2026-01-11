import React from "react";

const TermsConditions = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-600">
          Please read these terms and conditions carefully before using our
          Scholarship Management System.
        </p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using this platform, you agree to comply with and be
            bound by these Terms & Conditions. If you do not agree, please do
            not use the system.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. User Eligibility
          </h2>
          <p>
            Users must provide accurate and complete information during
            registration and scholarship application. Any false or misleading
            data may result in account suspension or rejection.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Use of the Platform
          </h2>
          <p>
            This platform is intended solely for managing scholarship
            applications. Unauthorized use, misuse, or attempts to harm the
            system are strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Application & Selection Process
          </h2>
          <p>
            Submission of an application does not guarantee scholarship
            approval. All applications are reviewed based on eligibility
            criteria, availability, and institutional policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Intellectual Property
          </h2>
          <p>
            All content, logos, and materials on this platform are the property
            of the Scholarship Management System and may not be copied or
            redistributed without permission.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any loss, damage, or delay caused by
            technical issues, incorrect information, or external factors beyond
            our control.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Account Suspension
          </h2>
          <p>
            We reserve the right to suspend or terminate user accounts that
            violate these terms or engage in suspicious or unethical behavior.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Changes to Terms
          </h2>
          <p>
            These Terms & Conditions may be updated at any time. Continued use
            of the platform after changes indicates acceptance of the updated
            terms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
