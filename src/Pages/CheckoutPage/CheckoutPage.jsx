import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const CheckoutPage = () => {
  const { id } = useParams();
//   const navigate = useNavigate();
  const { user } = useAuth();

  const [scholarship, setScholarship] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/scholarships/${id}`)
      .then(res => res.json())
      .then(data => {
        setScholarship(data);
        setLoading(false);
      });
  }, [id]);

  const totalAmount =
    (scholarship.applicationFees || 0) +
    (scholarship.serviceCharge || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      applicantName: user?.displayName,
      applicantEmail: user?.email,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      totalPaid: totalAmount,
      paymentStatus: "pending",
      applicationStatus: "submitted",
      appliedDate: new Date().toISOString()
    };

    fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(applicationData)
    })
      .then(res => res.json())
      .then(() => {
        alert("Application submitted successfully!");
        // navigate("/dashboard/my-applications");
      });
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br  py-12 px-4">
      <div className="w-9/12 px-10 mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold">
            Scholarship Check<span className="text-primary">out</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-lg mt-2 font-medium">
            Review details & confirm your application
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Scholarship Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h3 className=" text-xl md:text-2xl font-bold text-gray-800">
                {scholarship.scholarshipName}
              </h3>

              <p className="text-primary font-medium mt-1">
                🎓 {scholarship.universityName}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
                <p className="text-xs sm:text-sm md:text-[17px]">📍 <span className="font-medium">Country:</span> {scholarship.universityCountry}</p>
                <p className="text-xs sm:text-sm md:text-[17px]">🎓 <span className="font-medium">Degree:</span> {scholarship.degree}</p>
                <p className="text-xs sm:text-sm md:text-[17px]">📚 <span className="font-medium">Subject:</span> {scholarship.subjectCategory}</p>
                <p className="text-xs sm:text-sm md:text-[17px]">🗓 <span className="font-medium">Deadline:</span> {scholarship.applicationDeadline}</p>
              </div>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              Payment Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium md:text-[17px]">Application Fee</span>
                <span className="font-medium md:text-[17px]">${scholarship.applicationFees}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium md:text-[17px]">Service Charge</span>
                <span className="font-medium md:text-[17px]">${scholarship.serviceCharge}</span>
              </div>

              <div className="border-t pt-3 flex justify-between text-lg  font-bold text-green-600">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>

            {/* Applicant Info */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs md:text-sm font-semibold text-gray-700">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full mt-1 font-medium"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-semibold text-gray-700">
                  Applicant Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full mt-1 font-medium"
                />
              </div>

              <button className="btn bg-primary w-full text-lg mt-4 rounded-xl">
                Confirm & Apply
              </button>
            </form>

            <p className="text-xs md:text-sm text-gray-600 mt-4 text-center font-medium">
              🔒 Secure payment | Gateway integration coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
