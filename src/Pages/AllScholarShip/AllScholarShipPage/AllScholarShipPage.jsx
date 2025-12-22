import React, { useEffect, useState } from "react";
import ScholarShipBanner from "../ScholarShipBanner/ScholarShipBanner";
import TopScholarshipCard from "../../Home/TopScholarships/TopScholarshipCard/TopScholarshipCard";

const AllScholarShipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 9;

  const [query, setQuery] = useState({
    search: "",
    scholarshipCategory: "",
    subjectCategory: "",
    location: "",
    sort: "",
  });

  useEffect(() => {
    const queryString = new URLSearchParams({
      ...query,
      page,
      limit,
    }).toString();

    fetch(`http://localhost:3000/scholarships?${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data.result);
        setTotal(data.total);
      });
  }, [query, page]);

  const totalPages = Math.ceil(total / limit);

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
            className="select select-bordered w-full sm:w-auto text-sm sm:text-base"
            onChange={(e) =>
              setQuery({ ...query, sort: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="fee_asc">Application Fee (Low → High)</option>
            <option value="fee_desc">Application Fee (High → Low)</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8 sm:mb-12">
          {scholarships.map((scholarship) => (
            <TopScholarshipCard
              key={scholarship._id}
              scholarship={scholarship}
            />
          ))}
        </div>

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
                  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                  
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
                        <span key="ellipsis1" className="px-1 sm:px-2 py-1 text-gray-500 text-sm">
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
                        <span key="ellipsis2" className="px-1 sm:px-2 py-1 text-gray-500 text-sm">
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
