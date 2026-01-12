import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  FiPlusCircle,
  FiBook,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiImage,
  FiGlobe,
  FiRefreshCw,
  FiCheckCircle,
  FiAward,
  FiInfo
} from "react-icons/fi";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const initialFormState = {
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
  };

  const [formData, setFormData] = useState(initialFormState);
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
        title: "Scholarship Added",
        text: "The new scholarship has been successfully published to the portal.",
        background: "#ffffff",
        confirmButtonColor: "#3B82F6",
        timer: 3000,
      });

      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "We couldn't add the scholarship. Please check your connection and try again.",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-gray-200 pb-3 sm:pb-4">
      <div className={`p-2 sm:p-2.5 rounded-xl bg-linear-to-br ${color} text-white shadow-md`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <h3 className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight">{title}</h3>
    </div>
  );

  return (
    <div className="p-1 sm:p-8 lg:p-12 bg-[#F8FAFC] min-h-screen space-y-8 sm:space-y-12">
      <title>Add New Scholarship | ScholarPoint</title>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="relative z-10 space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2 flex items-center gap-3 sm:gap-4">
            <FiPlusCircle className="text-blue-400 shrink-0" /> New Scholarship
          </h1>
          <p className="text-blue-100 text-sm sm:text-lg lg:text-xl max-w-2xl font-medium leading-relaxed opacity-90 italic">
            Fill out the form below to create a new scholarship opportunity. Please provide clear and accurate information for students.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">

            <div className="space-y-8 sm:space-y-10 md:col-span-1">
              <SectionHeader icon={FiBook} title="1. Scholarship Information" color="from-blue-500 to-indigo-600" />

              <div className="space-y-5 sm:space-y-6">
                <FormGroup label="Scholarship Name" name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} placeholder="Enter name" required />
                <FormGroup label="Subject / Field" name="subjectCategory" value={formData.subjectCategory} onChange={handleChange} placeholder="e.g., Computer Science" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormGroup label="Funding" name="scholarshipCategory" value={formData.scholarshipCategory} onChange={handleChange} placeholder="e.g., Full Fund" required />
                  <FormGroup label="Degree" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g., Masters" required />
                </div>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10 md:col-span-1">
              <SectionHeader icon={FiMapPin} title="2. University Details" color="from-purple-500 to-pink-600" />

              <div className="space-y-5 sm:space-y-6">
                <FormGroup label="University Name" name="universityName" value={formData.universityName} onChange={handleChange} placeholder="Enter name" required />
                <FormGroup label="University Logo URL" name="universityImage" value={formData.universityImage} onChange={handleChange} placeholder="Paste link" icon={FiImage} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormGroup label="Country" name="universityCountry" value={formData.universityCountry} onChange={handleChange} placeholder="e.g., USA" required />
                  <FormGroup label="City" name="universityCity" value={formData.universityCity} onChange={handleChange} placeholder="e.g., New York" />
                </div>
                <FormGroup label="Global Rank" name="universityWorldRank" value={formData.universityWorldRank} onChange={handleChange} placeholder="Current rank" type="number" icon={FiGlobe} />
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10 md:col-span-2 xl:col-span-1">
              <SectionHeader icon={FiDollarSign} title="3. Fees & Deadline" color="from-emerald-500 to-teal-600" />

              <div className="space-y-5 sm:space-y-6">
                <FormGroup label="Tuition Fees (Optional)" name="tuitionFees" value={formData.tuitionFees} onChange={handleChange} placeholder="Yearly USD" type="number" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormGroup label="App Fee" name="applicationFees" value={formData.applicationFees} onChange={handleChange} placeholder="Amount USD" type="number" required />
                  <FormGroup label="Service Fee" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} placeholder="Amount USD" type="number" required />
                </div>
                <FormGroup label="Application Deadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} type="date" icon={FiCalendar} min={new Date().toISOString().split("T")[0]} required />

                <div className="pt-2 sm:pt-4">
                  <div className="p-4 sm:p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                      <FiAward className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-wide leading-tight mb-0.5 sm:mb-1">Created By</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">{formData.postedUserEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex items-center gap-3 text-gray-500 bg-gray-50/50 px-4 sm:px-5 py-3 rounded-xl border border-gray-100 w-full lg:w-auto">
              <FiInfo className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <p className="text-xs sm:text-sm font-medium leading-tight">
                Please double-check all information before publishing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setFormData(initialFormState)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-600 text-sm font-bold rounded-2xl hover:bg-gray-50 border border-gray-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Reset All Fields
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-sm sm:text-base font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 sm:gap-4 border-none cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {loading ? <FiRefreshCw className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> : <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span>{loading ? "Publishing..." : "Add Scholarship"}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const FormGroup = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5 sm:space-y-2 group">
    <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1 group-focus-within:text-blue-600 transition-colors">
      {label} {props.required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-4 h-4 sm:w-5 sm:h-5" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-11 sm:pl-12' : 'px-4 sm:px-5'} pr-4 sm:pr-5 py-3 sm:py-4 bg-[#F8FAFC] border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-sm sm:text-[15px] font-semibold text-gray-900 transition-all placeholder:text-gray-400`}
      />
    </div>
  </div>
);

export default AddScholarship;
