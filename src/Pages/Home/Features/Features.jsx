import React from "react";

const features = [
  {
    title: "All-in-One Scholarship Access",
    desc: "Browse and apply for multiple scholarship programs in a single, centralized platform, saving time and effort.",
  },
  {
    title: "Clear & Transparent Process",
    desc: "Follow a step-by-step application workflow with clear instructions, ensuring no steps are missed.",
  },
  {
    title: "Real-Time Application Tracking",
    desc: "Track your scholarship application status instantly, including approvals, comments, and updates from reviewers.",
  },
  {
    title: "Secure & Confidential Data Storage",
    desc: "All personal details and uploaded documents are encrypted and stored safely to guarantee privacy and security.",
  },
  {
    title: "Advanced Admin & Reviewer Tools",
    desc: "Admins and reviewers can manage applications efficiently, review candidates, and generate comprehensive reports.",
  },
  {
    title: "Instant Alerts & Notifications",
    desc: "Receive real-time notifications for deadlines, status updates, approvals, or any required action.",
  },
];

const Features = () => {
  return (
    <section className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 pt-20">
      <div className="text-center mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Platform Features
        </h2>
        <p className="text-gray-600 font-medium max-w-2xl mx-auto">
          Our Scholarship Management System is designed to make applying and managing scholarships easy, secure, and transparent.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-primary/20 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
              ✓
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700 font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;