import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    image: "",
    country: "",
    city: "",
    worldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
    postDate: new Date().toISOString().slice(0, 10),
    userEmail: user?.email || "",
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
      const res = await fetch("http://localhost:3000/scholarships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add scholarship");

      const data = await res.json();
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Scholarship added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setFormData({
        scholarshipName: "",
        universityName: "",
        image: "",
        country: "",
        city: "",
        worldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        deadline: "",
        postDate: new Date().toISOString().slice(0, 10),
        userEmail: user?.email || "",
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-red-500 to-pink-400 rounded-xl p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Add New Scholarship</h1>
        <p className="text-blue-100">Create a new scholarship opportunity for students worldwide</p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Scholarship Information</h2>
          <p className="text-sm text-gray-600 mt-1">Please fill in all required fields marked with *</p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Scholarship Name */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scholarship Name *
              </label>
              <input
                type="text"
                name="scholarshipName"
                value={formData.scholarshipName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Harvard Merit Scholarship Program"
                required
              />
            </div>

            {/* University Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                University Name *
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Harvard University"
                required
              />
            </div>

            {/* University Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                University Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://example.com/university-logo.jpg"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., United States"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Cambridge"
                required
              />
            </div>

            {/* World Rank */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                World Rank
              </label>
              <input
                type="number"
                name="worldRank"
                value={formData.worldRank}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., 1"
                min="1"
              />
            </div>

            {/* Subject Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject Category *
              </label>
              <input
                type="text"
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Computer Science, Medicine, Engineering"
                required
              />
            </div>

            {/* Scholarship Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scholarship Category *
              </label>
              <input
                type="text"
                name="scholarshipCategory"
                value={formData.scholarshipCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Merit-based, Need-based, Athletic"
                required
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Degree Type *
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Bachelor's, Master's, PhD"
                required
              />
            </div>

            {/* Tuition Fees */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tuition Fees (USD)
              </label>
              <input
                type="number"
                name="tuitionFees"
                value={formData.tuitionFees}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., 50000"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Optional - Leave blank if not applicable</p>
            </div>

            {/* Application Fees */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Fees (USD) *
              </label>
              <input
                type="number"
                name="applicationFees"
                value={formData.applicationFees}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., 100"
                min="0"
                required
              />
            </div>

            {/* Service Charge */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Charge (USD) *
              </label>
              <input
                type="number"
                name="serviceCharge"
                value={formData.serviceCharge}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., 50"
                min="0"
                required
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Post Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Date
              </label>
              <input
                type="date"
                name="postDate"
                value={formData.postDate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Automatically set to today's date</p>
            </div>

            {/* User Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Your admin email address</p>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 border hover:shadow-xl border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium transition-all duration-200 ${
                  loading 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:from-red-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Scholarship...
                  </span>
                ) : (
                  "Add Scholarship"
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