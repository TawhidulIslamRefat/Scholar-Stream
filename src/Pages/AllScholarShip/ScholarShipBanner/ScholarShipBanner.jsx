import React, { useState } from "react";

const ScholarShipBanner = ({ setQuery }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setQuery({
      search,
      scholarshipCategory: category,
      subjectCategory: subject,
      location,
    });
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <section className="relative bg-primary/10 overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center mb-5">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl opacity-60"></div>

      <div className="w-[98%] md:w-9/12 mx-auto px-4 md:px-0 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">

        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide mb-2 border border-primary/20">
              🚀 Start Your Journey Today
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15]">
              Find Your Dream <br />
              <span className="text-primary bg-clip-text bg-linear-to-r from-primary to-green-400">
                Scholarship
              </span>
            </h1>
            <p className=" text-sm md:text-lg  text-gray-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Unlock global opportunities with our smart search. Filter by degree, location, and funding to find the perfect match for your future.
            </p>
          </div>

          <div className="mt-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-6 sm:p-8">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by University, Scholarship Name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-5 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-400 font-medium"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-gray-600 font-medium appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <option value="">Category</option>
                    <option>Full Fund</option>
                    <option>Partial</option>
                    <option>Self Fund</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-gray-600 font-medium appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <option value="">Subject</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Medical</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-gray-600 font-medium appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <option value="">Location</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Canada</option>
                    <option>Europe</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full py-4 rounded-xl bg-primary hover:bg-green-700 text-white font-bold text-lg shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Finding Scholarships...</span>
                  </>
                ) : (
                  <>Search Opportunities</>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-purple-200/20 rounded-full blur-3xl transform scale-90"></div>
          <div className="relative max-w-[500px] h-100 md:h-full aspect-[4/5] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent z-10"></div>
            <img
              src="https://hed.nm.gov/uploads/images/ctas/scholarships.JPG"
              alt="Happy graduate student"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary font-bold text-lg">
                  🎓
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">Over 5000+ Students</p>
                  <p className="text-gray-500 text-xs font-medium">Have secured their future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarShipBanner;
