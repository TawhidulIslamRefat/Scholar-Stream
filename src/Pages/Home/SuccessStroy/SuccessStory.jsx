import React, { useEffect, useState } from "react";

const StoriesSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/SuccessStory.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching JSON:", err));
  }, []);

  return (
    <section className="py-16 mt-10">
      <div className="w-9/12 mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A2540] mb-4">
          Success Stories
        </h2>
        <p className="text-gray-600 text-base font-medium sm:text-lg mb-12">
          Discover how students achieved their dreams through scholarships and
          guidance.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.length > 0 ? (
            data.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#0A2540] mb-3">
                    {story.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
                    {story.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">Loading stories...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
