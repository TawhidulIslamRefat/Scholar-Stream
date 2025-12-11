import React, { useState } from "react";

const faqs = [
  {
    question: "How can I apply for a scholarship?",
    answer:
      "You can search for scholarships on our platform and follow the application guidelines provided for each opportunity.",
  },
  {
    question: "Is this service free?",
    answer:
      "Yes! Our platform is completely free for students looking for scholarships.",
  },
  {
    question: "Can I get guidance for multiple scholarships?",
    answer:
      "Absolutely. You can explore multiple scholarships and receive tips and guidance for each application.",
  },
  {
    question: "Do I need an account to apply?",
    answer:
      "Creating an account helps you save your progress and get personalized recommendations, but some information is accessible without signing up.",
  },
  {
    question: "How often are scholarships updated?",
    answer:
      "We regularly update our database to include the latest scholarships, deadlines, and eligibility criteria.",
  },
  {
    question: "Can I apply for international scholarships?",
    answer:
      "Yes! Our platform lists scholarships both local and international, along with detailed application guidance.",
  },
  {
    question: "Will I get personalized tips?",
    answer:
      "Yes, based on your profile, you can get personalized guidance and recommendations for scholarships.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-leaner-to-r from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-[#0A2540] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-700 mb-12 text-lg">
          Answers to common questions about scholarships and how our platform works.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-2xl shadow-md border transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${
                openIndex === index ? "border-primary shadow-xl" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0A2540]">
                  {faq.question}
                </h3>
                <span
                  className={`text-primary text-2xl transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
