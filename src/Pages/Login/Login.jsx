import React, { useState } from "react";
import img from "../../assets/undraw_authentication_1evl (1).svg";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, setUser, signInGoogle } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#FF5A3C",
          error,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signInGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          createAt: new Date(),
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              confirmButtonColor: "#FF5A3C",
            });
            console.error(error);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: "#FF5A3C",
          error,
        });
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row justify-center items-center w-full md:w-9/12 mx-auto">
        <div className=" font-display text-text-main flex items-center justify-center p-6 flex-1 ">
          <div className="w-full max-w-[460px] mx-auto ">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-dark mb-2">
                Login Your Account
              </h1>
              <p className="text-text-sub text-sm font-normal">
                Welcome back! Please enter your details
              </p>
            </header>

            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 border border-border-light rounded-lg py-2.5 px-4 transition-colors duration-200 mb-6 group hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-gray-700">Signing in...</span>
                </div>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Sign in with Google
                  </span>
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="h-px bg-gray-200 w-full"></div>
              <span className="absolute  px-3 text-xs text-gray-400 font-medium uppercase">
                OR
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-dark placeholder-gray-400 focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all pr-10 tracking-widest"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-4 cursor-pointer text-[16px]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="text-right">
                  <Link
                    to="/forget-password"
                    className="text-sm underline hover:text-primary"
                  >
                    Forget Password
                  </Link>
                </div>
              </div>

              <button
                className="w-full bg-[#1A1A1A] text-white font-bold rounded-lg py-3 transition-all duration-300 shadow-sm mt-2 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/register"
                  className="font-bold text-dark hover:underline ml-0.5 hover:text-primary"
                >
                  Sign Up
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

export default SignIn;
