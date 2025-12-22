import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";

const TopScholarshipCard = ({ scholarship }) => {
  return (
    <div className="h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="relative h-48 w-full p-4 shrink-0">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="px-7 py-4 flex flex-col grow">
          <span className="px-2 py-1 text-sm text-gray-500 border border-gray-200 font-medium self-start mb-2">
            {scholarship.scholarshipCategory}
          </span>
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {scholarship.scholarshipName}
          </h2>

          <p className="text-[15px] font-medium text-gray-500 mb-2">
            {scholarship.universityName}, {scholarship.universityCountry}
          </p>

          <div className="text-[15px] font-medium text-gray-600 mb-4">
            <p>🎓 Degree : {scholarship.degree}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium text-gray-700">Application Fees : {scholarship.applicationFees > 0 ? `$${scholarship.applicationFees}` : "Free"}</p>
             <Link
              to={`/scholarships/${scholarship._id}`}
              className="p-1 flex gap-2 items-center font-semibold text-primary transition-all duration-300 hover:underline"
            >
            View Details <BsArrowRight className="text-[15px]" />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScholarshipCard;
