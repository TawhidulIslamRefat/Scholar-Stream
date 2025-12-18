import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/scholarship (1).png";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const Links = (
    <>
      <li>
        <NavLink to="/" className="font-medium text-sm">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarship" className="font-medium text-sm">
          All Scholarships
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! ",
          error,
        });
      });
  };

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar  w-9/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8" />
            <span className="text-2xl font-semibold">ScholarStream</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end space-x-4">
          {user && user.photoURL ? (
            <>
              <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className=" m-1">
                  <img
                    className="w-10 md:w-12 h-10 md:h-12 rounded-full border-primary border-2"
                    src={user.photoURL}
                    alt="user avator"
                  />
                </div>
                <div
                  tabIndex="-1"
                  className="dropdown-content rounded-3xl bg-base-300 z-50 w-80 p-6 shadow-2xl border-2 border-purple-100 mt-16 backdrop-blur-3xl"
                >
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                        <div className="relative bg-white backdrop-blur-md rounded-2xl p-2 border border-white/20">
                          <h3 className=" font-bold text-lg mb-1">
                            Welcome Back!
                          </h3>
                          <p className="text-sm">
                            {user.displayName || "Scholar"}
                          </p>
                          <div className="flex justify-center mt-2">
                            <div className="w-12 h-1 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to="/dashboard" className="group relative block">
                      <div className="relative overflow-hidden bg-white backdrop-blur-2xl border border-white/20  rounded-2xl p-2.5 transform transition-all duration-500  shadow-xl">
                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            
                            <div className="relative">
                              <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center transform  transition-transform duration-500">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                  />
                                </svg>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-800transition-colors duration-300">
                                Dashboard
                              </h4>
                              <p className="text-sm text-gray-500 transition-colors duration-300">
                                Manage your profile
                              </p>
                            </div>
                          </div>

                          <div className="w-8 h-8 bg-gray-100  rounded-full flex items-center justify-center">
                            <FaArrowRight className="text-gray-600  text-sm" />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="group relative w-full block"
                    >
                      <div className="relative overflow-hidden backdrop-blur-2xl border border-white/20 rounded-2xl p-2 transform transition-all duration-500 bg-white  shadow-xl">
                        <div className="relative z-10 flex items-center justify-center space-x-4">
                          <div className="relative">
                            <div className="w-8 h-8 bg-linear-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center transform  transition-transform duration-500">
                              <svg
                                className="w-6 h-6 text-white transform  transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="text-center">
                            <h4 className="font-bold text-gray-800 transition-colors duration-300">
                              Sign Out
                            </h4>
                            <p className="text-sm text-gray-500 transition-colors duration-300">
                              See you later!
                            </p>
                          </div>
                          <div className="w-8 h-8 bg-gray-100  rounded-full flex items-center justify-center">
                            <FaArrowRight className="text-gray-600  text-sm" />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Decorative Footer */}
                    <div className="text-center pt-4 border-t border-white/20">
                      <div className="flex justify-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <p className=" text-xs font-medium">
                        ScholarStream Portal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-primary flex items-center gap-1"
              >
                Login <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/register"
                className="btn bg-primary rounded-4xl text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
