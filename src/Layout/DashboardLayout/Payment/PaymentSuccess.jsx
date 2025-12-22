import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaUniversity,
  FaDollarSign,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    fetch(`https://scholarstream-server-alpha.vercel.app/payment-success?session_id=${sessionId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Payment Successful! 🎉",
            text: "Your scholarship application payment has been processed",
            icon: "success",
            confirmButtonColor: "#10b981",
          });
          setPaymentData(data.payment || null);
        } else {
          Swal.fire({
            title: "Payment Failed",
            text: data.message || "Payment processing failed",
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong with payment processing",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
        console.error(err);
      });
  }, [sessionId]);

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-500">Verifying your transaction details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your scholarship application payment has been processed
            successfully. Thank you for choosing Scholar-Stream!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-green-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Transaction Complete</h2>
                <p className="text-green-100">Payment processed successfully</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm">Date</p>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <FaUniversity className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Scholarship Details
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Application Information
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Scholarship Name
                    </p>
                    <p className="font-semibold text-gray-800">
                      {paymentData.scholarshipName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      University
                    </p>
                    <p className="font-semibold text-gray-800">
                      {paymentData.universityName || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <FaDollarSign className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Payment Summary</h3>
                    <p className="text-gray-600 text-sm">Transaction Details</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Amount Paid
                    </p>
                    <p className="font-bold text-2xl text-green-600">
                      ${paymentData.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Currency
                    </p>
                    <p className="font-semibold text-gray-800">
                      {paymentData.currency?.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <FaCheckCircle className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Payment Status</h4>
                    <p className="text-green-600 font-semibold">
                      Successfully Completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Session ID</p>
                  <p className="font-mono text-xs text-gray-600">
                    {sessionId?.substring(0, 16)}...
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6">
              <h4 className="font-bold text-yellow-800 mb-3">What's Next?</h4>
              <ul className="text-yellow-800 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Your application has been submitted successfully
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  You will receive a confirmation email shortly
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  The university will review your application
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Track your application status in your dashboard
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/dashboard/my-applications")}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <span>View My Applications</span>
                <FaArrowRight className="ml-2" />
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaHome className="mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
