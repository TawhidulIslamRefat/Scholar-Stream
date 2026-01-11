import React from "react";
import Swal from "sweetalert2";

const Feedback = () => {
  const feedbackCategories = [
    {
      value: "general",
      label: "General Feedback",
      desc: "General comments about the platform",
    },
    {
      value: "application",
      label: "Application Process",
      desc: "Issues or suggestions about applying",
    },
    {
      value: "performance",
      label: "System Performance",
      desc: "Speed, reliability, or technical issues",
    },
    {
      value: "ui-ux",
      label: "UI/UX Design",
      desc: "Interface and user experience feedback",
    },
    { value: "bug", label: "Bug Report", desc: "Technical issues or errors" },
    {
      value: "feature",
      label: "Feature Request",
      desc: "New functionality suggestions",
    },
    {
      value: "documentation",
      label: "Documentation",
      desc: "Guides, help, or instructions",
    },
    { value: "other", label: "Other", desc: "Something else" },
  ];

  const userTypes = [
    { value: "student", label: "Student", desc: "Applying for scholarships" },
    {
      value: "provider",
      label: "Scholarship Provider",
      desc: "Managing scholarship programs",
    },
    { value: "reviewer", label: "Reviewer", desc: "Evaluating applications" },
    { value: "admin", label: "Administrator", desc: "Platform management" },
    {
      value: "institution",
      label: "Institution Representative",
      desc: "Educational institution staff",
    },
    { value: "other", label: "Other", desc: "Something else" },
  ];

  const handleSubmit = (event) => {
  event.preventDefault(); 

  Swal.fire({
    icon: "success",
    title: "Thank You!",
    text: "Thanks for your feedback. We really appreciate it.",
    confirmButtonText: "Close",
  });

  event.target.reset();
};


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <div className="bg-primary/20 text-black py-8 md:py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Feedback & Suggestions
          </h1>
          <p className="text-lg font-medium text-black max-w-3xl mx-auto leading-relaxed">
            Your feedback helps us improve the Scholarship Management System and
            provide a better experience for students and institutions.
          </p>
        </div>
      </div>

      <div className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-green-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Why Your Feedback Matters
              </h2>
              <p className="text-gray-700 font-medium leading-relaxed">
                We value your opinions and suggestions. Whether you are a
                student, reviewer, or administrator, your feedback helps us
                identify issues, improve features, and enhance overall system
                performance.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Feedback Guidelines
              </h2>
              <ul className="space-y-3 font-medium">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  <span>Please provide honest and constructive feedback</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  <span>Avoid sharing sensitive personal information</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  <span>
                    Be specific to help us understand the issue better
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                  <span>All feedback is reviewed by our support team</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 text-white rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Privacy & Confidentiality
              </h2>
              <p className="text-gray-700 font-medium leading-relaxed">
                Your feedback is treated confidentially and used only for system
                improvement purposes. We do not share feedback details with
                third parties.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-green-600 text-white rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Submit Your Feedback
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      User Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-white text-gray-900"
                      required
                    >
                      <option value="">Select your role</option>
                      {userTypes.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.label} - {type.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Feedback Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-white text-gray-900"
                      required
                    >
                      <option value="">Select category</option>
                      {feedbackCategories.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label} - {category.desc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Please provide detailed information about your feedback or suggestions..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none text-gray-900 placeholder-gray-500"
                    required
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-primary to-green-600 hover:from-green-700 hover:to-green-700 text-white py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Submit Your Feedback
                  </button>
                  <p className="text-center font-medium text-sm text-gray-500 mt-3">
                    Thank you for helping us improve our platform
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
