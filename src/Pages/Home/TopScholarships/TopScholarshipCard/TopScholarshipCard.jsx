import React from "react";
import { BsArrowRight, BsStarFill, BsCalendarEvent, BsGeoAlt } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";

const TopScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    scholarshipCategory,
    degree,
    applicationFees,
    applicationDeadline,
    rating,
    description
  } = scholarship;

  return (
    <div className="h-full flex flex-col group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
            {scholarshipCategory}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 shadow-black/50 drop-shadow-md">
              {universityName}
            </h3>
          </div>
        </div>

        <div className="p-5 flex flex-col grow">
          <div className="flex justify-between items-start mb-3 gap-2">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {scholarshipName}
            </h2>
            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg shrink-0">
              <BsStarFill className="text-orange-400 text-xs" />
              <span className="text-orange-700 text-xs font-bold">{rating || 4.8}</span>
            </div>
          </div>

          <p className="text-gray-500 font-medium  text-sm line-clamp-2 mb-4 leading-relaxed">
            {description || `A prestigious opportunity for ${degree} students at ${universityName}. Apply now to secure your funding.`}
          </p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-1 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <BsGeoAlt className="text-primary/70" />
              <span className="truncate font-medium">{universityCountry}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BsCalendarEvent className="text-primary/70" />
              <span className="truncate font-medium">{applicationDeadline || "Open"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaGraduationCap className="text-primary/70" />
              <span className="truncate font-medium">{degree}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-green-600">
              <span className="px-2 py-0.5 bg-green-50 rounded-md">
                {applicationFees > 0 ? `$${applicationFees}` : "Free"}
              </span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link
              to={`/scholarships/${_id}`}
              className="group/btn w-full bg-gray-50 hover:bg-primary text-gray-700 hover:text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              View Details
              <BsArrowRight className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScholarshipCard;
