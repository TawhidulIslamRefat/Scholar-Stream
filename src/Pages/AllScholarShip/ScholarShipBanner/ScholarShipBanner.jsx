import React, { useState } from "react";

const ScholarshipHero = ({setQuery}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    setQuery({
      search,
      scholarshipCategory:category,
      subjectCategory:subject,
      location
    })
  };

  return (
    <section className="relative bg-[#F8FAFC] overflow-hidden">
      <div className=" w-9/12 mx-auto  py-20 grid md:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
            🎓 Find Best Scholarship For You
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Discover Scholarships <br />
            <span className="">That Shape Your Future</span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-lg font-medium">
            Find scholarships by university, degree or program. Apply smart
            filters and get matched with the best opportunities worldwide.
          </p>

          {/* SEARCH CARD */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <input
              type="text"
              placeholder="Scholarship / University / Degree"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300"
              >
                <option value="">Category</option>
                <option>Full Fund</option>
                <option>Partial</option>
                <option>Self Fund</option>
              </select>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300"
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
                className="px-4 py-3 rounded-xl border border-gray-300"
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
              className="w-full py-3 rounded-xl bg-primary hover:bg-green-800 text-white font-semibold transition"
            >
              🔍 Search Scholarships
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZHlpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Students studying"
              className="w-full h-[520px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ScholarshipHero;
