import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";


const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <p>Checking Admin Access...</p>;
  }

  if (role?.toLowerCase() !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;