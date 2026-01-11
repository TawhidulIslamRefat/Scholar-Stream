import React, { useEffect, useState } from "react";
import ScholarShipBanner from "../ScholarShipBanner/ScholarShipBanner";
import TopScholarshipCard from "../../Home/TopScholarships/TopScholarshipCard/TopScholarshipCard";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { BsSortAlphaDown, BsSortNumericDown, BsCalendar3, BsCurrencyDollar } from "react-icons/bs";

const AllScholarShipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const axiosSecure = useAxiosSecure();

  const limit = 9;

  const [query, setQuery] = useState({
    search: "",
    scholarshipCategory: "",
    subjectCategory: "",
    location: "",
    sort: "",
  });

  const sortOptions = [
    {
      value: "",
      label: "Default",
      icon: <FiFilter className="w-4 h-4" />,
      description: "Original order"
    },
    {
      value: "fee_asc",
      label: "Fee: Low to High",
      icon: <BsCurrencyDollar className="w-4 h-4" />,
      description: "Cheapest first"
    },
    {
      value: "fee_desc",
      label: "Fee: High to Low", 
      icon: <BsCurrencyDollar className="w-4 h-4" />,
      description: "Most expensive first"
    },
    {
      value: "date_desc",
      label: "Newest First",
      icon: <BsCalendar3 className="w-4 h-4" />,
      description: "Recently posted"
    },
    {
      value: "name_asc",
      label: "Name: A to Z",
      icon: <BsSortAlphaDown className="w-4 h-4" />,
      description: "Alphabetical order"
    }
  ];

  const getCurrentSortOption = () => {
    return sortOptions.find(option => option.value === query.sort) || sortOptions[0];
  };

  const handleSortChange = (sortValue) => {
    setIsFiltering(true);
    setQuery({ ...query, sort: sortValue });
    setShowSortDropdown(false);
  };

  useEffect(() => {
    setIsFiltering(true);
    const queryString = new URLSearchParams({
      ...query,
      page,
      limit,
    }).toString();

    axiosSecure
      .get(`/scholarships?${queryString}`)
      .then((res) => {
        setScholarships(res.data.result);
        setTotal(res.data.total);
      })
      .catch((err) => {
        Swal.fire("Error fetching scholarships:", err);
        
      })
      .finally(() => {
        setLoading(false);
        setIsFiltering(false);
      });
  }, [query, page, axiosSecure]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSortDropdown && !event.target.closest('.sort-dropdown')) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <title>All Scholarship</title>
      <ScholarShipBanner setQuery={setQuery} />
 
      <section className="w-full md:w-9/12 mx-auto px-4 sm:px-0">
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-r from-primary/10 to-blue-50 p-3 rounded-xl">
                <FiFilter className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Search Results
                </h1>
                <p className="text-gray-600">
                  Found <span className="text-primary font-semibold text-lg">{total}</span> scholarships
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid View"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="List View"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              <div className="relative sort-dropdown">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  disabled={isFiltering}
                  className={`flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-primary/30 transition-all duration-200 min-w-[200px] ${
                    isFiltering ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {getCurrentSortOption().icon}
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-800">
                        {isFiltering ? 'Sorting...' : getCurrentSortOption().label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getCurrentSortOption().description}
                      </div>
                    </div>
                  </div>
                  <FiChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      showSortDropdown ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      {sortOptions.map((option, index) => (
                        <motion.button
                          key={option.value}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSortChange(option.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                            query.sort === option.value ? 'bg-primary/5 border-r-2 border-primary' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            query.sort === option.value ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${
                              query.sort === option.value ? 'text-primary' : 'text-gray-800'
                            }`}>
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {option.description}
                            </div>
                          </div>
                          {query.sort === option.value && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {(query.search || query.scholarshipCategory || query.subjectCategory || query.location || query.sort) && (
            <motion.div 
              className="mt-6 pt-6 border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-600">Active Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {query.search && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                    Search: "{query.search}"
                  </span>
                )}
                {query.scholarshipCategory && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                    Category: {query.scholarshipCategory}
                  </span>
                )}
                {query.subjectCategory && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200">
                    Subject: {query.subjectCategory}
                  </span>
                )}
                {query.location && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                    Location: {query.location}
                  </span>
                )}
                {query.sort && (
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-200">
                    Sort: {getCurrentSortOption().label}
                  </span>
                )}
                <button
                  onClick={() => {
                    setQuery({
                      search: "",
                      scholarshipCategory: "",
                      subjectCategory: "",
                      location: "",
                      sort: "",
                    });
                    setPage(1);
                  }}
                  className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full border border-red-200 hover:bg-red-100 transition-colors duration-150"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {isFiltering && !loading ? (
          <motion.div 
            className="flex justify-center items-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Please wait while we organize your results...</p>
              </div>
            </div>
          </motion.div>
        ) : scholarships.length === 0 && !loading ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    className="w-12 h-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Scholarships Found
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We couldn't find any scholarships matching your search criteria. 
                Try adjusting your filters or search terms to discover more opportunities.
              </p>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setQuery({
                      search: "",
                      scholarshipCategory: "",
                      subjectCategory: "",
                      location: "",
                      sort: "",
                    });
                    setPage(1);
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-primary to-green-700 hover:from-primary/90 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </motion.button>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery({ ...query, search: term });
                          setPage(1);
                        }}
                        className="px-3 py-1 bg-white text-gray-700 text-sm rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors duration-150"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className={`grid gap-4 mb-8 sm:mb-12 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 lg:grid-cols-2 gap-4'
            }`}
            layout
            transition={{ duration: 0.3 }}
          >
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                layout
              >
                <TopScholarshipCard
                  scholarship={scholarship}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mb-12 sm:mb-20">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`btn btn-sm w-full sm:w-auto ${
                  page === 1
                    ? "btn-disabled cursor-not-allowed opacity-50"
                    : "btn-outline hover:btn-primary"
                }`}
              >
                <span className="mr-1">←</span>
                Previous
              </button>

              <div className="flex gap-1 flex-wrap justify-center">
                {(() => {
                  const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;
                  let startPage = Math.max(
                    1,
                    page - Math.floor(maxVisiblePages / 2)
                  );
                  let endPage = Math.min(
                    totalPages,
                    startPage + maxVisiblePages - 1
                  );

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }

                  const pages = [];

                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setPage(1)}
                        className="btn btn-sm btn-outline"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span
                          key="ellipsis1"
                          className="px-1 sm:px-2 py-1 text-gray-500 text-sm"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`btn btn-sm ${
                          page === i ? "btn-primary" : "btn-outline"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span
                          key="ellipsis2"
                          className="px-1 sm:px-2 py-1 text-gray-500 text-sm"
                        >
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setPage(totalPages)}
                        className="btn btn-sm btn-outline"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}
              </div>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className={`btn btn-sm w-full sm:w-auto ${
                  page === totalPages
                    ? "btn-disabled cursor-not-allowed opacity-50"
                    : "btn-outline hover:btn-primary"
                }`}
              >
                Next
                <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllScholarShipPage;
