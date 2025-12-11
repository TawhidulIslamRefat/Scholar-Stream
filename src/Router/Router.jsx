import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Homepage from "../Pages/Home/HomePage/Homepage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<h1>This is error page</h1>,
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
            index:true,
            element:<Homepage></Homepage>
        },
        {
            index:true,
            element:<Homepage></Homepage>
        }
    ]
  },
]);