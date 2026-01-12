import React from "react";

const statistics = [
  { label: "Scholarships Awarded", value: 520 },
  { label: "Students Supported", value: 2400 },
  { label: "Applications Processed", value: 3800 },
  { label: "Positive Reviews", value: "4.8/5" },
];

const Statistics = () => {
  return (
    <section className=" mt-10 md:mt-60">
      <div className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl font-medium mx-auto">
            See how our Scholarship Management System has helped thousands of students achieve their dreams.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
