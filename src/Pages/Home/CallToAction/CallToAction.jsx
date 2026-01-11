import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-primary/10 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Ready to Start Your Scholarship Journey?
        </h2>
        <p className="text-gray-700  font-medium mb-8 max-w-2xl mx-auto">
          Apply for scholarships, track your applications, and manage your
          documents efficiently—all in one platform. Don’t miss out on your
          opportunities!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/all-scholarship"
            className="bg-primary hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition"
          >
            Apply Now
          </a>
          <a
            href="/guideline"
            className="bg-white hover:bg-gray-100 text-primary border-2 border-primary font-medium px-8 py-3 rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
