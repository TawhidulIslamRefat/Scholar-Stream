import { useSearchParams, useNavigate } from "react-router";
import { FaTimesCircle, FaExclamationTriangle, FaRedo, FaHome, FaHeadset } from "react-icons/fa";

const PaymentFailed = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const scholarshipName = params.get("scholarshipName") || "N/A";
  const errorMsg = params.get("error") || "Payment was not successful";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaTimesCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Failed ❌</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're sorry, but your payment could not be processed at this time. 
            Please review the details below and try again.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-red-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Transaction Failed</h2>
                <p className="text-red-100">Payment could not be completed</p>
              </div>
              <div className="text-right">
                <p className="text-red-100 text-sm">Date</p>
                <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <FaExclamationTriangle className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Application Details</h3>
                    <p className="text-gray-600 text-sm">Scholarship Information</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Scholarship Name</p>
                    <p className="font-semibold text-gray-800">{scholarshipName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <FaTimesCircle className="mr-1" />
                      Payment Failed
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <FaTimesCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Error Details</h3>
                    <p className="text-gray-600 text-sm">What went wrong</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Error Message</p>
                    <p className="font-semibold text-red-700">{errorMsg}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Transaction Time</p>
                    <p className="font-semibold text-gray-800">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mb-6">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                <FaExclamationTriangle className="mr-2" />
                Common Reasons for Payment Failure
              </h4>
              <ul className="text-yellow-800 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Insufficient funds in your account
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Incorrect card details or expired card
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Network connectivity issues
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Bank security restrictions
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-6">
              <h4 className="font-bold text-blue-800 mb-3">What You Can Do Next</h4>
              <ul className="text-blue-800 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Check your card details and try again
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Ensure you have sufficient funds
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Try using a different payment method
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Contact your bank if the issue persists
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaRedo className="mr-2" />
                Try Payment Again
              </button>
              
              <button
                onClick={() => navigate("/dashboard/my-applications")}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaHome className="mr-2" />
                Return to Dashboard
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

export default PaymentFailed;
