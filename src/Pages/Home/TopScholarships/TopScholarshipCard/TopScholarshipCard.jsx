import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";

const TopScholarshipCard = ({ scholarship }) => {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="relative h-70 w-full p-7">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="px-7 py-4 space-y-2">
          <span className=" px-2 py-1 text-sm  text-gray-500 border border-gray-200 mt-5 font-medium">
            {scholarship.scholarshipCategory}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
            {scholarship.scholarshipName}
          </h2>

          <p className="text-[16px] font-medium text-gray-500">
            {scholarship.universityName}, {scholarship.universityCountry}
          </p>

          <div className=" gap-2 text-[16px] font-medium text-gray-600">
            <p>🎓 Degree : {scholarship.degree}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[17px] font-medium text-gray-700">Application Fees : {scholarship.applicationFees > 0 ? `$${scholarship.applicationFees}` : "Free"}</p>
             <Link
              to={`/scholarships/${scholarship._id}`}
             className="mt-3 p-1 flex gap-2  items-center font-semibold text-primary transition-all duration-300 hover:underline justify-end">
            View Details <BsArrowRight className="text-[18px]" />
          </Link>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default TopScholarshipCard;
