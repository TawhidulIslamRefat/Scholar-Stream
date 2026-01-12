import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSave,
  FiBook,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiImage,
  FiGlobe,
  FiAward,
  FiActivity,
  FiRefreshCw
} from "react-icons/fi";

const UpdateScholarshipModal = ({ scholarship, onClose, onUpdate }) => {
  const [saving, setSaving] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { _id, ...restData } = scholarship;
  const [formData, setFormData] = useState(restData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    axiosSecure
      .patch(`/scholarships/${_id}`, formData)
      .then((res) => {
        Swal.fire({
          title: "Update Successful",
          text: "The scholarship records have been updated in the core system.",
          icon: "success",
          confirmButtonColor: "#3B82F6",
          background: "#ffffff",
          timer: 2500,
        });
        onUpdate({ _id, ...formData });
        onClose();
      })
      .catch((error) => {
        console.error("Update error:", error);
        Swal.fire({
          title: "System Error",
          text: error.response?.data?.message || error.message || "Unable to sync updates.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setSaving(false));
  };

  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 border-b border-gray-100 pb-2.5 sm:pb-3">
      <div className={`p-1.5 sm:p-2 rounded-lg bg-linear-to-br ${color} text-white shadow-sm`}>
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
      <h3 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col border border-white"
      >
        <div className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 px-6 sm:px-8 py-6 sm:py-8 text-white relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 sm:mb-2">
                <FiActivity className="animate-pulse" /> Governance Protocol
              </div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight">Modify <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Scholarship</span></h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all border-none cursor-pointer group">
              <FiX className="w-5 h-5 sm:w-6  group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide">
          <form onSubmit={handleSubmit} id="update-form" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">

            <div className="space-y-6 sm:space-y-8 md:col-span-1">
              <SectionHeader icon={FiBook} title="Scholarship Core" color="from-blue-500 to-indigo-600" />
              <div className="space-y-4 sm:space-y-5">
                <FormGroup label="Scholarship Name" name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} placeholder="e.g. Merit-Based Grant" required />
                <FormGroup label="Subject / Field" name="subjectCategory" value={formData.subjectCategory} onChange={handleChange} placeholder="e.g. Engineering" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormGroup label="Category" name="scholarshipCategory" value={formData.scholarshipCategory} onChange={handleChange} placeholder="Full Fund" />
                  <FormGroup label="Degree" name="degree" value={formData.degree} onChange={handleChange} placeholder="Masters" />
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 md:col-span-1">
              <SectionHeader icon={FiMapPin} title="Institutional Data" color="from-purple-500 to-pink-600" />
              <div className="space-y-4 sm:space-y-5">
                <FormGroup label="University Name" name="universityName" value={formData.universityName} onChange={handleChange} placeholder="Oxford University" required />
                <FormGroup label="University Image URL" name="universityImage" value={formData.universityImage} onChange={handleChange} placeholder="https://..." icon={FiImage} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormGroup label="Country" name="universityCountry" value={formData.universityCountry} onChange={handleChange} placeholder="UK" required />
                  <FormGroup label="City" name="universityCity" value={formData.universityCity} onChange={handleChange} placeholder="Oxford" />
                </div>
                <FormGroup label="Global World Rank" name="universityWorldRank" value={formData.universityWorldRank} onChange={handleChange} placeholder="1" type="number" icon={FiGlobe} />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 md:col-span-2 xl:col-span-1">
              <SectionHeader icon={FiDollarSign} title="Financial Meta" color="from-emerald-500 to-teal-600" />
              <div className="space-y-4 sm:space-y-5">
                <FormGroup label="Tuition Fees (USD)" name="tuitionFees" value={formData.tuitionFees} onChange={handleChange} placeholder="50000" type="number" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormGroup label="App Fee" name="applicationFees" value={formData.applicationFees} onChange={handleChange} placeholder="100" type="number" required />
                  <FormGroup label="Service Fee" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} placeholder="50" type="number" required />
                </div>
                <FormGroup label="Application Deadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} type="date" icon={FiCalendar} required />

                <div className="pt-2">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <FiAward className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight mb-0.5">Entry Origin</p>
                      <p className="text-[11px] sm:text-xs font-bold text-gray-700 truncate">{formData.postedUserEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 sm:px-8 py-5 sm:py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6 shrink-0">
          <p className="text-gray-400 text-[10px] sm:text-xs font-medium w-full md:w-auto text-center md:text-left">Identity ID: <span className="font-mono text-gray-500">{_id}</span></p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-gray-500 text-sm font-bold rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer active:scale-95 shadow-sm"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              form="update-form"
              disabled={saving}
              className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-blue-600 text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 border-none cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {saving ? <FiRefreshCw className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> : <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />}
              {saving ? "Syncing..." : "Update Record"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const FormGroup = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5 sm:space-y-2 group">
    <label className="block text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide ml-1 group-focus-within:text-blue-500 transition-colors">
      {label} {props.required && <span className="text-rose-400">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-3.5 h-3.5 sm:w-4 sm:h-4" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-11' : 'px-4'} pr-4 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none text-xs sm:text-sm font-bold text-gray-700 transition-all placeholder:text-gray-300`}
      />
    </div>
  </div>
);

export default UpdateScholarshipModal;
