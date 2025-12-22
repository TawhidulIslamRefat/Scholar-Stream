import React, { useState } from "react";
import img from "../../assets/undraw_authentication_1evl (1).svg";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const { forgetPassword } = useAuth();
  const location = useLocation();
  const preEmail = location.state?.email || "";
  const [email, setEmail] = useState(preEmail);
  const handleForgetPassword = (event) => {
    event.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter Your Email First",
      });
      return;
    }
    forgetPassword(email)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password Reset email sent! Check your Inbox",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          confirmButtonColor: "#FF5A3C",
        });
      });
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row justify-center items-center w-full md:w-9/12 mx-auto">
        <div className="font-display text-text-main flex items-center justify-center p-6 flex-1 ">
          <div className="w-full max-w-[460px] mx-auto ">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-dark mb-2">
                Recover Your Account
              </h1>
              <p className="text-text-sub text-sm font-normal">
                Please enter your Email and Recover Your Account
              </p>
            </header>

            <form onSubmit={handleForgetPassword} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-bold text-dark mb-1.5"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-dark placeholder-gray-400 focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <button
                className="w-full bg-[#1A1A1A] text-white font-bold rounded-lg py-3  transition-all duration-300 shadow-sm mt-2 hover:bg-primary"
                type="submit"
              >
                Forget Password
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <Link
                  to="/login"
                  className="font-bold text-dark hover:underline ml-0.5 hover:text-primary"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-5 md:px-0">
          <img src={img} alt="Auth" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
