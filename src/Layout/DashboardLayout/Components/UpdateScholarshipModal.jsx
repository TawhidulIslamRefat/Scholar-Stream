import React, { useState } from "react";
import Swal from "sweetalert2";

const UpdateScholarshipModal = ({ scholarship, onClose, onUpdate }) => {
  const [saving, setSaving] = useState(false);

  const { _id, ...restData } = scholarship;

  const [formData, setFormData] = useState(restData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://localhost:3000/scholarships/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      Swal.fire({
        title: "Updated!",
        text: "Scholarship updated successfully",
        icon: "success",
        confirmButtonColor: "#16a34a", 
      });
      onUpdate({ _id, ...formData });
      onClose();
    } catch (error) {
      Swal.fire("Error", error.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden">
        <div className="bg-gray-200 px-6 py-7 ">
          <h2 className="text-2xl font-bold">Update Scholarship</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex flex-col">
            <label className="font-medium mb-1">Scholarship Name</label>
            <input
              type="text"
              name="scholarshipName"
              value={formData.scholarshipName || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Global Excellence Scholarship"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">University Name</label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="University of Oxford"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">University Image URL</label>
            <input
              type="text"
              name="universityImage"
              value={formData.universityImage || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="https://image-url.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Country</label>
            <input
              type="text"
              name="universityCountry"
              value={formData.universityCountry || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="UK"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">City</label>
            <input
              type="text"
              name="universityCity"
              value={formData.universityCity || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Oxford"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">University World Rank</label>
            <input
              type="number"
              name="universityWorldRank"
              value={formData.universityWorldRank || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="2"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Subject Category</label>
            <input
              type="text"
              name="subjectCategory"
              value={formData.subjectCategory || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Computer Science"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Scholarship Category</label>
            <input
              type="text"
              name="scholarshipCategory"
              value={formData.scholarshipCategory || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Full Fund"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Masters"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Tuition Fees</label>
            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="0"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Application Fees</label>
            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="100"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Service Charge</label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="50"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium mb-1">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Post Date</label>
            <input
              type="date"
              name="scholarshipPostDate"
              value={formData.scholarshipPostDate || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Posted User Email</label>
            <input
              type="email"
              name="postedUserEmail"
              value={formData.postedUserEmail || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="admin@email.com"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn px-5 py-4 bg-primary text-white rounded-lg"
            >
              {saving ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarshipModal;
