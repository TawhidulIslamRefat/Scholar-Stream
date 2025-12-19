import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";


const ModeratorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <p>Checking Moderator Access...</p>;
  }

  const userRole = role?.toLowerCase().replace(/"/g, "").trim();;

  if (userRole !== "admin" && userRole !== "moderator") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ModeratorRoute;