import React from "react";
import logo from "../../../assets/scholarship (1).png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="ScholarStream Logo"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  ScholarStream
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  Scholarship Platform
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed font-medium">
              Connecting students with scholarship opportunities worldwide. Your
              journey to educational success starts here.
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center font-medium">
                <span className="mr-2">📧</span>
                <span>support@scholarstream.com</span>
              </div>
              <div className="flex items-center font-medium">
                <span className="mr-2">📞</span>
                <span>+880 1999999999999</span>
              </div>
              <div className="flex items-center font-medium">
                <span className="mr-2">📍</span>
                <span>Khulna,Bangladesh</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Browse Scholarships",
                "How It Works",
                "Success Stories",
                "Application Tips",
                "Student Resources",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "FAQ",
                "Live Chat",
                "Report Issue",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Careers",
                "Press",
                "Privacy Policy",
                "Terms of Service",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary font-medium transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0 font-medium">
              © {new Date().getFullYear()} ScholarStream. All rights reserved.
            </div>

            <div className="flex space-x-4">
              {[
                {
                  name: "Facebook",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  ),
                },
                {
                  name: "X (Twitter)",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-200 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
