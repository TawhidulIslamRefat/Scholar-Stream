import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router";

const EducationHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden  bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-display transition-colors duration-300">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] -z-10 wavy-lines rounded-full opacity-50 pointer-events-none transform -rotate-12 translate-x-[-20%]"></div>

      <div className="w-9/12 mx-auto px-4 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative w-full  flex justify-center items-center">
            <div className="absolute top-0 right-10 lg:right-20 transform -translate-y-1/2 flex flex-col gap-2 z-20">
              <div className="w-12 h-2 bg-purple-500 rounded-full transform -rotate-45"></div>
              <div className="w-8 h-2 bg-orange-400 rounded-full transform -rotate-45 ml-4"></div>
            </div>
            <div className="absolute bottom-10 left-10 flex gap-2 z-20">
              <div className="w-8 h-2 bg-pink-500 rounded-full transform -rotate-45"></div>
              <div className="w-6 h-2 bg-orange-500 rounded-full transform -rotate-45 mt-2"></div>
            </div>

            <div className="relative w-full max-w-[550px] aspect-[4/3.5] flex-1">
              <div className="absolute top-0 left-0 w-[55%] h-[80%] bg-accent-pink/40 dark:bg-accent-pink/20 rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-sm z-10 border border-white/20 dark:border-white/5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj8Xj2W1UHTqJ-CaN6264tP1iQUnRKhBMzzlxohACY8bPv2u6XCf23TWWg-CRYe2aSIWBMmle-xAlAMqjc6d-QC6yKbFHwjJs7QC5bYcIvHOInzd4alNytYBMLMy2lURnKu6_ErB2_dij1JuVWUWx1mEQgcZsDRGG8Wk8mmBuhBLFG1aVkgXdWCU5Fj1OVwkD4whjBNZeN20ECcnroj0Rau-eJUHO5pWnKHJFqEh4i3LvGbbIaDdyzFRguHd6pZ9V8GeNBEUtVWxOA"
                  alt="Confused student holding notebooks"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[80%] bg-accent-blue rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-lg z-0 border-4 border-white dark:border-background-dark">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV0eYX7SsTcg5llZVR_QfYwBct-qSATgf2TPPJmGCXK0VAzmoxkAAmoftivr8wjAUBv9MfbnHKX3NmXs3B3bq8Fn3SN2dC5H3KBE4dDcsXKgegCaTjj1L5Cb8z-U9TQBkcGAhjFhSVk1dPOQtN6RYl-DSIElsrLJas-wel5zIXwHoOZHZp8KRu0X9S2Tld400bHEhUAedE5n3UVvAfMpxQOI6lDDWYczOhv2La6zhrAp9kWv1tTAqgcp0--NXg3-oD6aHTBMUXI6G8"
                  alt="Male student holding coffee and books"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-8 w-24 h-24 dot-pattern opacity-60 z-[-1]"></div>
            </div>
          </div>
          <div className="w-full  space-y-8 flex-1">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
                Explore Top Scholarships <br className="hidden xl:block" />&
                Education Opportunities
              </h1>
              <p className="text-gray-500  text-lg leading-relaxed max-w-xl font-medium">
                Discover fully-funded scholarships and programs to achieve your
                global education goals. Apply easily and expand your horizons!
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center transition-colors group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50">
                  <span className="material-icons-round text-orange-500 text-lg">
                    <FaCheck />
                  </span>
                </div>
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  Track your scholarship applications.
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-colors group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50">
                  <span className="material-icons-round text-blue-600 text-lg">
                    <FaCheck />
                  </span>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Access global universities & programs.
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center transition-colors group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50">
                  <span className="material-icons-round text-pink-500 text-lg">
                    <FaCheck />
                  </span>
                </div>
                <span className="text-pink-500 dark:text-pink-400 font-medium">
                  Personalized guidance & support.
                </span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <Link to='' className="bg-primary hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-full shadow-md shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95">
                Find Scholarship
              </Link>
              <div className="flex items-center gap-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationHero;
