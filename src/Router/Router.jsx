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
import PrivateRoute from "./PrivateRoute";
import Payment from "../Layout/DashboardLayout/Payment/Payment";
import PaymentSuccess from "../Layout/DashboardLayout/Payment/PaymentSuccess";
import PaymentFailed from "../Layout/DashboardLayout/Payment/PaymentFailed";
import Overview from "../Layout/DashboardLayout/Components/Overview";
import Guidelines from "../Pages/Guidelines/Guidelines";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Feedback from "../Pages/Feedback/Feedback";
import TermsConditions from "../Pages/TermsConditions/TermsConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
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
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/guideline",
        element: <Guidelines></Guidelines>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/feedback",
        element: <Feedback></Feedback>,
      },
      {
        path: "/terms",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Overview></Overview>,
      },
      {
        path: "overview",
        element: <Overview></Overview>,
      },
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
      {
        path: "payment/:applicationId",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-failed",
        element: <PaymentFailed></PaymentFailed>,
      },
    ],
  },
  {
    path:"/*",
    element:<ErrorPage></ErrorPage>
  }
]);
