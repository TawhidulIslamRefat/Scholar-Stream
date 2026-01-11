import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import logo from "../../../assets/scholarship (1).png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Browse Scholarships", path: "/all-scholarship" },
    { name: "Guidelines", path: "/guideline" },
    { name: "About Us", path: "/about-us" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const supportLinks = [
    { name: "Feedback", path: "/feedback" },
    { name: "Guidelines", path: "/guideline" },
    { name: "Report Issue", href: "mailto:support@scholarpoint.com" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Careers", href: "/all-scholarship" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/scholarpoint",
      color: "hover:bg-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://twitter.com/scholarpoint",
      color: "hover:bg-black",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/scholarpoint",
      color: "hover:bg-blue-700",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@scholarpoint",
      color: "hover:bg-red-600",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/scholarpoint",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "https://discord.gg/scholarpoint",
      color: "hover:bg-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLinkClick = (link) => {
    if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <footer className="bg-linear-to-br from-gray-50 to-white border-t border-gray-200">
      <div className="flex justify-center">
        <div className="w-[98%] md:w-9/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 ">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 lg:gap-12"
          >
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center mb-6">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  src={logo}
                  alt="ScholarPoint Logo"
                  className="w-12 h-12 mr-3"
                />
                <div>
                  <h3 className="text-2xl font-bold bg-linear-to-r from-primary to-green-600 bg-clip-text text-transparent">
                    ScholarPoint
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Scholarship Platform
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed font-medium text-sm lg:text-base">
                Connecting students with scholarship opportunities worldwide.
                Your journey to educational success starts here.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
                Support
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.onClick) {
                            e.preventDefault();
                            handleLinkClick(link);
                          }
                        }}
                        className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm flex items-center group cursor-pointer"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
                Company
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.onClick) {
                            e.preventDefault();
                            handleLinkClick(link);
                          }
                        }}
                        className="text-gray-600 hover:text-primary font-medium transition-all duration-200 text-sm flex items-center group cursor-pointer"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-linear-to-r from-gray-100 to-gray-50 border-t border-gray-200">
        <div className="w-[98%] md:w-9/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 text-sm font-medium text-center lg:text-left"
            >
              © {currentYear} ScholarPoint. All rights reserved. | Made with ❤️
              for students worldwide.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-white border border-gray-200 ${social.color} rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
