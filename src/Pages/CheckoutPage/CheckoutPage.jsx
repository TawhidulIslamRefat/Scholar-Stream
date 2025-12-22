import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingDashboard from "../../Components/LoadingDashboard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
    <div className="min-h-screen bg-linear-to-br py-8 sm:py-10 md:py-12 px-4">
      <title>Scholarship Checkout</title>
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 px-4 sm:px-6 md:px-8 lg:px-10 mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Scholarship Check<span className="text-primary">out</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 font-medium">
            Review details & confirm your application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-48 sm:h-56 md:h-64"
            />

            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                {scholarship.scholarshipName}
              </h3>

              <p className="text-primary font-medium mt-1 text-sm sm:text-base">
                🎓 {scholarship.universityName}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6 text-sm">
                <p className="text-sm sm:text-base md:text-[17px]">
                  📍 <span className="font-medium">Country:</span>{" "}
                  {scholarship.universityCountry}
                </p>
                <p className="text-sm sm:text-base md:text-[17px]">
                  🎓 <span className="font-medium">Degree:</span>{" "}
                  {scholarship.degree}
                </p>
                <p className="text-sm sm:text-base md:text-[17px]">
                  📚 <span className="font-medium">Subject:</span>{" "}
                  {scholarship.subjectCategory}
                </p>
                <p className="text-sm sm:text-base md:text-[17px]">
                  🗓 <span className="font-medium">Deadline:</span>{" "}
                  {scholarship.applicationDeadline}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-800">
              Payment Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-sm sm:text-base md:text-[17px]">
                  Application Fee
                </span>
                <span className="font-medium text-sm sm:text-base md:text-[17px]">
                  ${scholarship.applicationFees}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-sm sm:text-base md:text-[17px]">
                  Service Charge
                </span>
                <span className="font-medium text-sm sm:text-base md:text-[17px]">
                  ${scholarship.serviceCharge}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between text-base sm:text-lg font-bold text-green-600">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-4 sm:mt-5 md:mt-6 space-y-4"
            >
              <div>
                <label className="block text-sm md:text-sm font-semibold text-gray-700 mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm md:text-sm font-semibold text-gray-700 mb-1">
                  Applicant Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="btn bg-primary hover:bg-green-700 text-white w-full text-base sm:text-lg mt-4 rounded-xl py-2 sm:py-3 transition-colors duration-200"
              >
                Confirm & Apply
              </button>
            </form>

            <p className="text-xs sm:text-sm text-gray-600 mt-4 text-center font-medium">
              🔒 Secure payment | Gateway integration coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
