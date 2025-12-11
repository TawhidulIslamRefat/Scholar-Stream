import React from "react";
import error from "../../../public/404 website error animation.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className=" w-[300px] md:-[500px] lg:w-[800px]">
          <Lottie animationData={error} loop={true} />
          <div className="flex flex-col justify-center items-center">
            <h1 className=" text-xl sm:text-2xl ms:text-4xl lg:text-6xl font-bold text-center ">
              Page Not <span className="text-[#FFC256]">Found!</span>
            </h1>
            <p className="text-sm md:text-[16px] font-medium text-center mt-8 ">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
