import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingDashboard from "../../Components/LoadingDashboard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUniversity, FaMapMarkerAlt, FaGraduationCap, FaBookOpen, FaCalendarAlt, FaCheckCircle, FaLock } from "react-icons/fa";

const CheckoutPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const totalAmount =
    (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityAddress: scholarship.universityCountry,
      Feedback: "",
      subjectCategory: scholarship.subjectCategory,
      applicantName: user?.displayName,
      applicantEmail: user?.email,
      applicationFees: totalAmount,
      paymentStatus: "unpaid",
      applicationStatus: "pending",
      appliedDate: new Date().toISOString(),
    };
    axiosSecure
      .post("/applications", applicationData)
      .then(() => {
        Swal.fire({
          title: "Application Submitted Successfully!",
          text: "Your application has been submitted. Complete the payment to confirm it.",
          icon: "success",
          confirmButtonColor: "#008000",
        });
        navigate("/dashboard/my-applications");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while submitting the application.",
          icon: "error",
          confirmButtonColor: "#FF5A3C",
        });
      });
  };

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-0 font-sans">
      <title>Scholarship Checkout</title>

      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Complete Your <span className="text-primary">Application</span>
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Review your scholarship details and secure your future.
        </p>
      </div>

      <div className="w-[98%] md:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative h-64 w-full">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <h3 className="text-2xl font-bold leading-tight">{scholarship.scholarshipName}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-90 text-sm font-medium">
                    <FaUniversity />
                    <span>{scholarship.universityName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Information Overview
                </h4>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-green-50 text-green-600 rounded-lg shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</span>
                    <p className="font-semibold text-gray-800 text-base mt-0.5">{scholarship.universityCountry}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <FaGraduationCap className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Degree</span>
                    <p className="font-semibold text-gray-800 text-base mt-0.5">{scholarship.degree}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                    <FaBookOpen className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Subject</span>
                    <p className="font-semibold text-gray-800 text-base mt-0.5">{scholarship.subjectCategory}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Application Deadline</span>
                    <p className="font-semibold text-gray-800 text-base mt-0.5">{scholarship.applicationDeadline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 lg:sticky lg:top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Application Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Application Fee</span>
                <span className="font-medium text-gray-900">${scholarship.applicationFees}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Service Charge</span>
                <span className="font-medium text-gray-900">${scholarship.serviceCharge}</span>
              </div>

              <div className="border-t border-dashed border-gray-200 my-4"></div>

              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-800">Total Payable</span>
                <span className="font-extrabold text-primary text-2xl">${totalAmount}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Applicant Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium focus:outline-none cursor-not-allowed"
                  />
                  <FaCheckCircle className="absolute right-4 top-3.5 text-green-500 text-lg" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Applicant Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-medium focus:outline-none cursor-not-allowed"
                  />
                  <FaCheckCircle className="absolute right-4 top-3.5 text-green-500 text-lg" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-green-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Confirm Application
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 py-2 rounded-lg">
              <FaLock className="text-gray-400" />
              Secure SSL Encrypted Payment
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
