import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingDashboard from "../../../Components/LoadingDashboard";

const Payment = () => {
  const { scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await fetch(
          `https://scholarstream-server-alpha.vercel.app/scholarships/${scholarshipId}`
        );
        const data = await res.json();
        setScholarship(data);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [scholarshipId]);

  const handlePayment = async () => {
    if (!scholarship) return;

    const paymentInfo = {
      applicationFees: scholarship.applicationFees,
      applicationId: scholarship._id,
      applicantEmail: scholarship.applicantEmail,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName || "N/A",
    };

    try {
      const res = await fetch(
        "https://scholarstream-server-alpha.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentInfo),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe session URL not returned", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (loading) return <LoadingDashboard></LoadingDashboard>;

  if (!scholarship) return <p>Scholarship not found.</p>;

  return (
    <div className="p-10 text-center">
      <title>Payment</title>
      <h1 className="text-2xl font-semibold mb-4">
        Please pay ${scholarship.applicationFees} for{" "}
        {scholarship.scholarshipName}
      </h1>
      <p className="mb-6">University: {scholarship.universityName || "N/A"}</p>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
