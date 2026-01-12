import React from "react";

const AboutUs = () => {
  const features = [
    {
      title: "Centralized Scholarship Access",
      desc: "Find and apply for multiple scholarship opportunities in one convenient platform without searching multiple sources.",
    },
    {
      title: "Transparent Application Process",
      desc: "Follow a clear, step-by-step application workflow, ensuring that every applicant knows exactly what to do and when.",
    },
    {
      title: "Real-Time Application Tracking",
      desc: "Monitor your scholarship applications in real-time, including status updates, reviewer comments, and approval notifications.",
    },
    {
      title: "Secure Data & Document Management",
      desc: "All your personal information and uploaded documents are encrypted and stored safely, ensuring privacy and compliance.",
    },
    {
      title: "Smart Admin & Reviewer Tools",
      desc: "Admins and reviewers can efficiently manage applications, evaluate candidates, and generate reports with minimal effort.",
    },
    {
      title: "Instant Alerts & Notifications",
      desc: "Receive timely notifications about application deadlines, approvals, or required actions so you never miss an opportunity.",
    },
  ];

  const values = [
    {
      icon: "🎓",
      title: "Accessibility",
      desc: "Equal opportunities for all students",
    },
    { icon: "🔒", title: "Security", desc: "Advanced data privacy protection" },
    {
      icon: "⚖️",
      title: "Transparency",
      desc: "Fair and clear selection process",
    },
    {
      icon: "🚀",
      title: "Innovation",
      desc: "Cutting-edge technology solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary/20 text-black py-8 md:py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            About Our Scholarship Management System
          </h1>
          <p className="text-lg md:text-xl text-black font-medium max-w-3xl mx-auto">
            Empowering students by simplifying scholarship discovery,
            application, and management.
          </p>
        </div>
      </div>

      <div className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className=" text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 font-medium leading-relaxed text-base md:text-lg">
            Our Scholarship Management System is a digital platform designed to
            streamline the entire scholarship process for students, educational
            institutions, and scholarship providers. We aim to remove
            complexity, reduce paperwork, and ensure transparency in scholarship
            distribution.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              Our mission is to make scholarship opportunities accessible to
              every deserving student by providing a centralized, reliable, and
              secure platform that supports fair evaluation and timely
              assistance.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              We envision a future where no student misses an educational
              opportunity due to lack of financial resources, and technology
              bridges the gap between students and scholarship providers.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-br from-primary/5 to-green-50 rounded-lg border border-primary/20 p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Choose Our Scholarship Management System
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-700 pt-0.5">
                <span className="font-semibold">User-Friendly Design:</span>{" "}
                Intuitive, responsive, and mobile-friendly interface that makes
                applying for scholarships effortless.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-700 pt-0.5">
                <span className="font-semibold">Secure Data Management:</span>{" "}
                Advanced encryption ensures that all your personal information
                and documents are protected.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-700 pt-0.5">
                <span className="font-semibold">
                  Transparent Selection Process:
                </span>{" "}
                Clear, fair, and fully documented methodology for evaluating
                scholarship applications.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-700 pt-0.5">
                <span className="font-semibold">
                  Real-Time Updates & Communication:
                </span>{" "}
                Instant notifications keep students informed about deadlines,
                approvals, and important announcements.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <p className="text-gray-700  pt-0.5">
                <span className="font-semibold">Continuous Improvement:</span>{" "}
                Regular platform updates, new features, and enhancements ensure
                the system evolves with student needs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm font-medium text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
