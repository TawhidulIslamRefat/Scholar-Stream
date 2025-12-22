import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    postDate: new Date().toISOString().slice(0, 10),
    postedUserEmail: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post("/scholarships", formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Scholarship added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        postDate: new Date().toISOString().slice(0, 10),
        postedUserEmail: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add scholarship. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <title>Add Scholarship</title>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-200 px-4 sm:px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Add New Scholarship
          </h1>
          <p className="text-gray-600 font-medium mb-3 text-sm sm:text-base">
            Create a new scholarship opportunity for students worldwide
          </p>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Scholarship Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Scholarship Name
              </label>
              <input
                type="text"
                name="scholarshipName"
                value={formData.scholarshipName}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Harvard Merit Scholarship Program"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                University Name
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Harvard University"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                University Image URL
              </label>
              <input
                type="url"
                name="universityImage"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="https://example.com/university-logo.jpg"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Country
              </label>
              <input
                type="text"
                name="universityCountry"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., United States"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                City
              </label>
              <input
                type="text"
                name="universityCity"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Cambridge"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                World Rank
              </label>
              <input
                type="number"
                name="universityWorldRank"
                value={formData.worldRank}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., 1"
                min="1"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Subject Category
              </label>
              <input
                type="text"
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Computer Science, Medicine, Engineering"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Scholarship Category
              </label>
              <input
                type="text"
                name="scholarshipCategory"
                value={formData.scholarshipCategory}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Merit-based, Need-based, Athletic"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Degree Type
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., Bachelor's, Master's, PhD"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Tuition Fees (USD)
              </label>
              <input
                type="number"
                name="tuitionFees"
                value={formData.tuitionFees}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., 50000"
                min="0"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Application Fees (USD)
              </label>
              <input
                type="number"
                name="applicationFees"
                value={formData.applicationFees}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., 100"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Service Charge (USD)
              </label>
              <input
                type="number"
                name="serviceCharge"
                value={formData.serviceCharge}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                placeholder="e.g., 50"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Application Deadline
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-pink-500 transition-colors outline-none text-sm sm:text-[15px]"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Post Date
              </label>
              <input
                type="date"
                name="postDate"
                value={formData.postDate}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-[15px]"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Admin Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.postedUserEmail}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-[15px]"
                readOnly
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 sm:px-6 py-2 sm:py-3 border hover:shadow-xl border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 sm:px-8 py-2 sm:py-3 bg-linear-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-red-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="hidden sm:inline">
                      Adding Scholarship...
                    </span>
                    <span className="sm:hidden">Adding...</span>
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Add Scholarship</span>
                    <span className="sm:hidden">Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
