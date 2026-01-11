import React, { useEffect, useState } from "react";
import TopScholarshipCard from "./TopScholarshipCard/TopScholarshipCard";
import Loading from "../../../Components/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/top-scholarships")
      .then((res) => {
        const data = res.data;
        const sorted = data.sort((a, b) => {
          if (a.applicationFees === b.applicationFees) {
            return (
              new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate)
            );
          }
          return a.applicationFees - b.applicationFees;
        });
        setScholarships(sorted.slice(0, 8));
      })
      .catch((err) => {
        Swal.fire("Error to fetch data",err)
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className=" w-[90%] sm:w-[95%] 2xl:w-9/12 mx-auto mt-22 ">
        <div
          className="text-center mb-10 mt-7 md:mt-15 md:mb-14"
          data-aos="fade-up"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 md:mt-5 text-center">
            Top Scholarships
          </h2>
          <p className="text-gray-600 text-base font-medium sm:text-lg mt-2.5">
            Achieve More with the World’s Best Scholarships
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-2">
          {scholarships.slice(0, 8).map((scholarship) => (
            <TopScholarshipCard
              key={scholarship._id}
              scholarship={scholarship}
            ></TopScholarshipCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopScholarships;
