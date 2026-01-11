import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "5 Tips to Secure a Scholarship Successfully",
    date: "Jan 5, 2026",
    author: "Dr. Sarah Johnson",
    category: "Application Tips",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&crop=face",
    excerpt: "Learn practical tips and strategies to improve your scholarship application and maximize your chances of success.",
    content: `
      <h3>Introduction</h3>
      <p>Securing a scholarship can be a game-changer for your educational journey. With the right approach and preparation, you can significantly increase your chances of success. Here are five essential tips that will help you stand out from the competition.</p>
      
      <h3>1. Start Early and Stay Organized</h3>
      <p>The key to scholarship success is preparation. Start researching and applying for scholarships at least 6-12 months before you need the funding. Create a spreadsheet to track deadlines, requirements, and application status for each scholarship.</p>
      
      <h3>2. Tailor Your Applications</h3>
      <p>Never use a one-size-fits-all approach. Each scholarship has unique criteria and values. Customize your essays, personal statements, and application materials to align with the specific scholarship's mission and requirements.</p>
      
      <h3>3. Showcase Your Unique Story</h3>
      <p>What makes you different? Highlight your unique experiences, challenges you've overcome, and how the scholarship will help you achieve your goals. Authenticity resonates with scholarship committees.</p>
      
      <h3>4. Get Strong Letters of Recommendation</h3>
      <p>Choose recommenders who know you well and can speak to your character, achievements, and potential. Give them plenty of time and provide them with your resume and scholarship details.</p>
      
      <h3>5. Proofread and Follow Instructions</h3>
      <p>Attention to detail matters. Follow all instructions carefully, meet word limits, and ensure your application is error-free. Have someone else review your materials before submitting.</p>
      
      <h3>Conclusion</h3>
      <p>Remember, scholarship applications are investments in your future. Take the time to craft compelling, authentic applications that showcase your potential. With persistence and the right strategy, you can secure the funding you need for your education.</p>
    `,
    tags: ["Scholarships", "Application Tips", "Student Success", "Education Funding"]
  },
  {
    id: 2,
    title: "Understanding Merit-Based vs Need-Based Scholarships",
    date: "Dec 28, 2025",
    author: "Prof. Michael Chen",
    category: "Scholarship Types",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
    excerpt: "A clear guide to help students identify the right scholarship type according to their eligibility and needs.",
    content: `
      <h3>Understanding Scholarship Categories</h3>
      <p>When searching for scholarships, you'll encounter two main categories: merit-based and need-based scholarships. Understanding the differences between these types is crucial for targeting the right opportunities.</p>
      
      <h3>Merit-Based Scholarships</h3>
      <p>Merit-based scholarships are awarded based on academic achievement, talents, skills, or other accomplishments. These scholarships recognize excellence and potential, regardless of financial need.</p>
      
      <h4>Common Merit-Based Criteria:</h4>
      <ul>
        <li>High GPA or academic performance</li>
        <li>Standardized test scores (SAT, ACT, etc.)</li>
        <li>Leadership experience and extracurricular activities</li>
        <li>Athletic achievements</li>
        <li>Artistic or creative talents</li>
        <li>Community service and volunteer work</li>
      </ul>
      
      <h3>Need-Based Scholarships</h3>
      <p>Need-based scholarships are awarded to students who demonstrate financial need. These scholarships aim to make education accessible to students who might not otherwise be able to afford it.</p>
      
      <h4>Need-Based Requirements:</h4>
      <ul>
        <li>FAFSA (Free Application for Federal Student Aid) completion</li>
        <li>Family income documentation</li>
        <li>Tax returns and financial statements</li>
        <li>Proof of enrollment in eligible programs</li>
      </ul>
      
      <h3>Hybrid Scholarships</h3>
      <p>Many scholarships combine both merit and need-based criteria. These scholarships look for academically strong students who also demonstrate financial need.</p>
      
      <h3>Which Type Should You Apply For?</h3>
      <p>The answer is both! Don't limit yourself to one category. Apply for scholarships that match your profile, whether that's academic excellence, financial need, or both.</p>
      
      <h3>Tips for Success</h3>
      <p>Regardless of the scholarship type, focus on presenting a complete picture of yourself. Highlight your achievements, explain your circumstances, and demonstrate how the scholarship will help you achieve your goals.</p>
    `,
    tags: ["Merit-Based", "Need-Based", "Financial Aid", "Scholarship Types"]
  },
  {
    id: 3,
    title: "Top 10 Scholarship Opportunities in 2026",
    date: "Dec 15, 2025",
    author: "Emma Rodriguez",
    category: "Opportunities",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&crop=face",
    excerpt: "Discover the latest scholarships for students in various fields, with deadlines and eligibility requirements.",
    content: `
      <h3>2026 Scholarship Landscape</h3>
      <p>The scholarship landscape for 2026 offers exciting opportunities across various fields. Here are the top 10 scholarships that students should consider applying for this year.</p>
      
      <h3>1. National Merit Scholarship Program</h3>
      <p><strong>Amount:</strong> $2,500 - $10,000<br>
      <strong>Deadline:</strong> October 2026<br>
      <strong>Eligibility:</strong> High school juniors who take the PSAT/NMSQT</p>
      
      <h3>2. Gates Scholarship</h3>
      <p><strong>Amount:</strong> Full tuition coverage<br>
      <strong>Deadline:</strong> September 15, 2026<br>
      <strong>Eligibility:</strong> High-achieving, low-income minority students</p>
      
      <h3>3. Coca-Cola Scholars Program</h3>
      <p><strong>Amount:</strong> $20,000<br>
      <strong>Deadline:</strong> October 31, 2026<br>
      <strong>Eligibility:</strong> High school seniors with leadership experience</p>
      
      <h3>4. Dell Scholars Program</h3>
      <p><strong>Amount:</strong> $20,000 + laptop + support services<br>
      <strong>Deadline:</strong> December 1, 2026<br>
      <strong>Eligibility:</strong> Students overcoming significant obstacles</p>
      
      <h3>5. Jack Kent Cooke Foundation Scholarship</h3>
      <p><strong>Amount:</strong> Up to $55,000 per year<br>
      <strong>Deadline:</strong> November 2026<br>
      <strong>Eligibility:</strong> High-achieving students with financial need</p>
      
      <h3>6. QuestBridge National College Match</h3>
      <p><strong>Amount:</strong> Full four-year scholarships<br>
      <strong>Deadline:</strong> September 2026<br>
      <strong>Eligibility:</strong> High-achieving, low-income students</p>
      
      <h3>7. Hispanic Scholarship Fund</h3>
      <p><strong>Amount:</strong> $500 - $5,000<br>
      <strong>Deadline:</strong> March 30, 2026<br>
      <strong>Eligibility:</strong> Hispanic/Latino students</p>
      
      <h3>8. STEM Scholarship Program</h3>
      <p><strong>Amount:</strong> $1,000 - $10,000<br>
      <strong>Deadline:</strong> Various dates<br>
      <strong>Eligibility:</strong> Students pursuing STEM fields</p>
      
      <h3>9. Women in Technology Scholarship</h3>
      <p><strong>Amount:</strong> $2,500 - $15,000<br>
      <strong>Deadline:</strong> February 2026<br>
      <strong>Eligibility:</strong> Female students in technology fields</p>
      
      <h3>10. Community Foundation Scholarships</h3>
      <p><strong>Amount:</strong> Varies by location<br>
      <strong>Deadline:</strong> Various dates<br>
      <strong>Eligibility:</strong> Local students in specific communities</p>
      
      <h3>Application Strategy</h3>
      <p>Start early, stay organized, and apply to multiple scholarships. Each application is an investment in your future, so take the time to craft compelling, authentic submissions.</p>
      
      <h3>Additional Resources</h3>
      <p>Remember to check with your school's guidance counselor, local community organizations, and professional associations in your field of interest for additional scholarship opportunities.</p>
    `,
    tags: ["2026 Scholarships", "Opportunities", "Deadlines", "Financial Aid"]
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    document.body.style.overflow = 'unset'; 
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      <section className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 pt-20">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Latest Blogs & Tips</h2>
          <p className="text-gray-600 max-w-2xl font-medium mx-auto">
            Stay informed with the latest scholarship news, application tips, and guides to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-primary/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 font-medium text-sm mb-3">By {blog.author}</p>
                
                <p className="text-gray-700 font-medium mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openModal(blog)}
                  className="text-primary font-semibold hover:text-green-700 transition-colors duration-200 flex items-center gap-2 group/btn"
                >
                  Read More
                  <svg 
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedBlog.category}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedBlog.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <span>By {selectedBlog.author}</span>
                    <span>•</span>
                    <span>{selectedBlog.date}</span>
                    <span>•</span>
                    <span>{selectedBlog.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 max-h-[calc(90vh-16rem)] overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedBlog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  style={{
                    lineHeight: '1.7',
                    color: '#374151'
                  }}
                />

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{selectedBlog.author}</p>
                        <p className="text-sm text-gray-600">Education Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        .prose h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #374151;
        }
        
        .prose p {
          margin-bottom: 1rem;
        }
        
        .prose ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
      `}</style>
    </>
  );
};

export default Blogs;
