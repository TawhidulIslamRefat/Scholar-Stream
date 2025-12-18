import React from "react";
import DashboardLayout from "./DashboardLayout";
import MyApplicationsTable from "../../Components/MyApplicationsTable";
import MyReviewsTable from "../../Components/MyReviewsTable";

const StudentDashboard = ({ user }) => {
  return (
    <DashboardLayout user={user}>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <MyApplicationsTable user={user} />
      <MyReviewsTable user={user} />
    </DashboardLayout>
  );
};

export default StudentDashboard;
