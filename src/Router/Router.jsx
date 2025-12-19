import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Homepage from "../Pages/Home/HomePage/Homepage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import AllScholarShipPage from "../Pages/AllScholarShip/AllScholarShipPage/AllScholarShipPage";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import DashBoardLayout from "../Layout/DashboardLayout/DashBoardLayout";
import Profile from "../Layout/DashboardLayout/Components/Profile";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import Analytics from "../Layout/DashboardLayout/Components/Analytics";
import ManageUsers from "../Layout/DashboardLayout/Components/ManageUsers";
import ManageScholarships from "../Layout/DashboardLayout/Components/ManageScholarships";
import AddScholarship from "../Layout/DashboardLayout/Components/AddScholarship";
import AllReviews from "../Layout/DashboardLayout/Components/AllReviews";
import MyApplications from "../Layout/DashboardLayout/Components/MyApplications";
import MyReviews from "../Layout/DashboardLayout/Components/MyReviews";
import ManageApplications from "../Layout/DashboardLayout/Components/ManageApplications";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index:true,
        element: <Homepage></Homepage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "/all-scholarship",
        element: <AllScholarShipPage></AllScholarShipPage>,
      },
      {
        path: "/scholarships/:id",
        element: <ScholarshipDetails></ScholarshipDetails>,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage></CheckoutPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Profile /> }, 
      { path: "profile", element: <Profile /> },
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        ),
      },
      { path: "my-applications", element: <MyApplications /> },
      { path: "my-reviews", element: <MyReviews /> },
    ],
  },
]);
