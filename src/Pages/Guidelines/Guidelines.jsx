import React from "react";
import { Link } from "react-router";

const Guidelines = () => {
  const guidelines = [
    {
      title: "General Information",
      content:
        "The Scholarship Management System is designed to provide financial assistance to eligible students based on academic performance, financial need, and other criteria defined by the scholarship provider. Applicants must ensure that all information provided is accurate and complete.",
    },
    {
      title: "Eligibility Criteria",
      items: [
        "The applicant must be a registered and active student.",
        "Applicants must meet the minimum academic requirements.",
        "Only students from eligible institutions may apply.",
        "Financial-need-based scholarships require income verification.",
        "Each applicant can apply for multiple scholarships if eligible.",
      ],
    },
    {
      title: "Required Documents",
      items: [
        "Recent passport-size photograph",
        "Academic certificates and transcripts",
        "National ID card / Birth certificate",
        "Proof of income (if applicable)",
        "Recommendation letter (if required)",
      ],
      note: "All documents must be clear, valid, and uploaded in the supported file formats.",
    },
    {
      title: "Application Process",
      ordered: true,
      items: [
        "Create an account or log in to your dashboard.",
        "Complete your personal, academic, and financial information.",
        "Select a scholarship that matches your eligibility.",
        "Upload all required documents.",
        "Review the application carefully before submission.",
        "Submit the application before the deadline.",
      ],
    },
    {
      title: "Application Review & Selection",
      content:
        "All applications are reviewed by the scholarship committee. Selection is based on eligibility, academic merit, financial need, and available funding. Meeting minimum requirements does not guarantee approval.",
    },
    {
      title: "Application Status & Notifications",
      statuses: [
        {
          label: "Submitted",
          desc: "Application has been successfully submitted.",
        },
        { label: "Under Review", desc: "Application is being evaluated." },
        { label: "Approved", desc: "Scholarship has been granted." },
        { label: "Rejected", desc: "Application did not meet requirements." },
      ],
    },
    {
      title: "Rules & Regulations",
      items: [
        "Providing false information may result in disqualification.",
        "Late submissions will not be accepted.",
        "Scholarship decisions are final and non-negotiable.",
        "Violation of rules may lead to cancellation.",
      ],
    },
    {
      title: "Responsibilities of Scholarship Recipients",
      items: [
        "Maintain required academic performance.",
        "Use funds only for educational purposes.",
        "Submit progress reports if required.",
      ],
    },
    {
      title: "Privacy & Data Protection",
      content:
        "All personal data submitted through this platform is kept confidential and used solely for scholarship evaluation and administration.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-[#d7edf7] to-[#a1dff3] border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Scholarship Application Guidelines
          </h1>
          <p className="text-gray-600 text-base font-medium md:text-lg">
            Please read all instructions carefully to ensure a successful
            scholarship application.
          </p>
        </div>
      </div>

      <div className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 py-10">
        <div className="space-y-8">
          {guidelines.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-primary">
                {index + 1}. {section.title}
              </h2>

              {section.content && (
                <p className="text-gray-700 font-medium  leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.items && !section.ordered && (
                <ul className="space-y-2.5">
                  {section.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.ordered && (
                <ol className="space-y-2.5 list-decimal list-inside">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700 font-medium pl-2">
                      {item}
                    </li>
                  ))}
                </ol>
              )}

              {section.note && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-900">
                    <strong>Note:</strong> {section.note}
                  </p>
                </div>
              )}

              {section.statuses && (
                <div className="space-y-3">
                  {section.statuses.map((status, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-semibold text-gray-900">
                          {status.label}
                        </span>
                        <span className="text-gray-600 font-medium text-sm ml-2">
                          – {status.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-white border-2 border-primary rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Share Your Feedback
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-medium">
            Your feedback helps us improve the Scholarship Management System.
            Please let us know your suggestions, ideas, or any issues you have
            faced during the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to='/feedback' className="bg-primary hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
              Submit Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
