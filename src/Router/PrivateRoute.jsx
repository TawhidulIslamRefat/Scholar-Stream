import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import LoadingDashboard from "../Components/LoadingDashboard";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;