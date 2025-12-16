import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Homepage from "../Pages/Home/HomePage/Homepage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import AllScholarShipPage from "../Pages/AllScholarShip/AllScholarShipPage/AllScholarShipPage";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            element:<Homepage></Homepage>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/forget-password',
            element:<ForgetPassword></ForgetPassword>
        },
        {
            path:'/all-scholarship',
            element:<AllScholarShipPage></AllScholarShipPage>
        },
        {
            path:'/scholarships/:id',
            element:<ScholarshipDetails></ScholarshipDetails>
        }
    ]
  },
]);