import React, { useEffect, useState } from "react";

const StoriesSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/SuccessStory.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching JSON:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 mt-6 sm:mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center min-h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading success stories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-16 mt-6 sm:mt-10">
      <div className="w-full md:w-9/12 mx-auto px-2 sm:px-0">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0">
            Success Stories
          </h2>
          <p className="text-base font-medium sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Discover how students achieved their dreams through scholarships and guidance
          </p>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8">
            {data.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm font-medium sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {story.description}
                  </p>
                  
                  <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                    ✓ Success Story
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Stories Available</h3>
            <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">Success stories will appear here once available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoriesSection;
