import React, { useEffect, useState } from "react";
import ScholarShipBanner from "../ScholarShipBanner/ScholarShipBanner";
import TopScholarshipCard from "../../Home/TopScholarships/TopScholarshipCard/TopScholarshipCard";

const AllScholarShipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [query, setQuery] = useState({
    search: "",
    scholarshipCategory: "",
    subjectCategory: "",
    location: "",
  });

  useEffect(() => {
    const queryString = new URLSearchParams(query).toString();
    fetch(`http://localhost:3000/scholarships?${queryString}`)
    .then(res => res.json())
    .then(data => setScholarships(data))
  }, [query]);
  return (
    <div>
      <section>
        <ScholarShipBanner setQuery={setQuery}></ScholarShipBanner>
      </section>
      <section className="w-9/12 mx-auto">
        <h1 className="font-medium text-2xl mb-8">
          Search Result{" "}
          <span className="font-semibold text-primary">
            {scholarships.length}
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 container mb-20">
          {scholarships.map((scholarship) => (
            <TopScholarshipCard
              key={scholarship._id}
              scholarship={scholarship}
            ></TopScholarshipCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllScholarShipPage;
