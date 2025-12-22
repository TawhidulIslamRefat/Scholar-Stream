import React, { useState } from "react";

const ScholarshipHero = ({setQuery}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setQuery({
      search,
      scholarshipCategory:category,
      subjectCategory:subject,
      location
    });
    // Reset loading state after a short delay to show feedback
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <section className="relative bg-[#F8FAFC] overflow-hidden">
      <div className="w-full md:w-9/12 mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
        <div className="order-2 md:order-1">
          <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 rounded-full bg-green-100 text-green-600 text-xs sm:text-sm font-semibold">
            🎓 Find Best Scholarship For You
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover Scholarships <br />
            <span className="">That Shape Your Future</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-gray-600 max-w-full lg:max-w-lg font-medium text-sm sm:text-base">
            Find scholarships by university, degree or program. Apply smart
            filters and get matched with the best opportunities worldwide.
          </p>
          
          <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="Scholarship / University / Degree"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-sm sm:text-base"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 text-sm sm:text-base"
              >
                <option value="">Category</option>
                <option>Full Fund</option>
                <option>Partial</option>
                <option>Self Fund</option>
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 text-sm sm:text-base"
              >
                <option value="">Subject</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Medical</option>
              </select>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 text-sm sm:text-base"
              >
                <option value="">Location</option>
                <option>USA</option>
                <option>UK</option>
                <option>Canada</option>
                <option>Europe</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full py-2 sm:py-3 rounded-xl bg-primary hover:bg-green-800 text-white font-semibold transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>🔍 Search Scholarships</>
              )}
            </button>
          </div>
        </div>
        
        <div className="relative order-1 md:order-2">
          <div className="absolute -top-6 sm:-top-10 -left-6 sm:-left-10 w-48 sm:w-60 lg:w-72 h-48 sm:h-60 lg:h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://i.ndtvimg.com/i/2016-12/graduation-generic_650x400_81481305985.jpg?downsize=545:307"
              alt="Students studying"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[520px] "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipHero;
