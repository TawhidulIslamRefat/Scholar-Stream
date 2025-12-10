import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Homepage from "../Pages/Home/HomePage/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<h1>This is error page</h1>,
    children:[
        {
            index:true,
            element:<Homepage></Homepage>
        }
    ]
  },
]);