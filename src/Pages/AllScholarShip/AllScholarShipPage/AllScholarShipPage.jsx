import React, { useEffect, useState } from "react";
import ScholarShipBanner from "../ScholarShipBanner/ScholarShipBanner";
import TopScholarshipCard from "../../Home/TopScholarships/TopScholarshipCard/TopScholarshipCard";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllScholarShipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const axiosSecure = useAxiosSecure();

  const limit = 9;

  const [query, setQuery] = useState({
    search: "",
    scholarshipCategory: "",
    subjectCategory: "",
    location: "",
    sort: "",
  });

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

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <ScholarShipBanner setQuery={setQuery} />

      <section className="w-full md:w-9/12 mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
          <h1 className="font-medium text-xl sm:text-2xl">
            Search Result{" "}
            <span className="text-primary font-semibold">{total}</span>
          </h1>

          <select
            className="select select-bordered w-full sm:w-auto text-sm sm:text-base disabled:opacity-50"
            onChange={(e) => {
              setIsFiltering(true);
              setQuery({ ...query, sort: e.target.value });
            }}
            disabled={isFiltering}
          >
            <option value="">
              {isFiltering ? "Sorting..." : "Sort By"}
            </option>
            <option value="fee_asc">Application Fee (Low → High)</option>
            <option value="fee_desc">Application Fee (High → Low)</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>

        {isFiltering && !loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">Loading scholarships...</span>
            </div>
          </div>
        ) : scholarships.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <svg 
                  className="w-20 h-20 mx-auto text-gray-300" 
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
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                No Scholarships Found
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We couldn't find any scholarships matching your search criteria. 
                Try adjusting your filters or search terms to discover more opportunities.
              </p>
              <div className="space-y-3">
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
                  className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-green-800 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Clear All Filters
                </button>
                <p className="text-sm text-gray-500">
                  Or try searching for popular terms like "Computer Science", "Engineering", or "Business"
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8 sm:mb-12">
            {scholarships.map((scholarship) => (
              <TopScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
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
