import React from "react";

const NewsletterSection = () => {
  return (
    <section className="w-full bg-[#08B89D] py-25 relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-64 bg-[#7DE7D1] rounded-br-[120px]"></div>

      <div className="absolute right-0 bottom-0 h-52 w-72 bg-[#7DE7D1] rounded-tl-[120px]"></div>

      <div className="absolute right-12 top-10 space-y-2">
        <div className="flex space-x-2">
          <div className="w-4 h-4 border-2 border-white rounded-xl"></div>
          <div className="w-4 h-4 border-2 border-white rounded-xl"></div>
        </div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 border-2 border-white rounded-xl"></div>
          <div className="w-4 h-4 border-2 border-white rounded-xl"></div>
        </div>
      </div>

      <div className="absolute left-20 bottom-10">
        <div className="w-10 h-10 bg-white rotate-45 rounded-md"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Join Our Newsletter
          </h2>
          <p className="text-white text-lg font-medium">
            Subscribe our newsletter to get our latest update & news.
          </p>
        </div>

        <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[480px] h-[60px]">
          <input
            type="email"
            placeholder="Enter your email:"
            className="flex-1 px-5 text-[16px] outline-none text-gray-700"
          />
          <button className="bg-black text-white px-8 text-[16px] font-semibold hover:opacity-90">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
