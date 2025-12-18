import React from "react";
import DashboardLayout from "./DashboardLayout";
import ApplicationsTable from "../../Components/ApplicationsTable";
import ReviewsTable from "../../Components/ReviewsTable";

const ModeratorDashboard = ({ user }) => {
  return (
    <DashboardLayout user={user}>
      <h1 className="text-2xl font-bold mb-6">Moderator Dashboard</h1>
      <ApplicationsTable />
      <ReviewsTable />
    </DashboardLayout>
  );
};

export default ModeratorDashboard;
