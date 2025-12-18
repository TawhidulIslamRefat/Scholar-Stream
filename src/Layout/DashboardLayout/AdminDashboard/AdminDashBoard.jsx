import React from "react";
import DashboardLayout from "./DashboardLayout";
import ScholarshipForm from "../../Components/ScholarshipForm";
import ScholarshipTable from "../../Components/ScholarshipTable";
import UsersTable from "../../Components/UsersTable";
import AnalyticsChart from "../../Components/AnalyticsChart";

const AdminDashboard = ({ user }) => {
  return (
    <DashboardLayout user={user}>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ScholarshipForm />
      <ScholarshipTable />
      <UsersTable />
      <AnalyticsChart />
    </DashboardLayout>
  );
};

export default AdminDashboard;
