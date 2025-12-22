import React, { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/scholarship (1).png";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Links = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `font-medium text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? 'text-primary bg-primary/10' 
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/all-scholarship" 
          className={({ isActive }) =>
            `font-medium text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? 'text-primary bg-primary/10' 
                : 'text-gray-700 hover:text-primary hover:bg-gray-100'
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
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
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className=" w-full md:w-9/12 mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">ScholarStream</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {Links}
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && user.photoURL ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <img
                    className="w-11 h-11 rounded-full border-2 border-gray-200"
                    src={user.photoURL}
                    alt="User avatar"
                  />
                </button>

                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          Welcome Back!
                        </h3>
                        <p className="text-sm text-gray-600">
                          {user.displayName || "Scholar"}
                        </p>
                        <div className="flex justify-center mt-2">
                          <div className="w-12 h-1 bg-linear-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Link 
                        to="/dashboard/overview" 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Dashboard</h4>
                            <p className="text-xs text-gray-500">Manage your profile</p>
                          </div>
                        </div>
                        <FaArrowRight className="text-gray-400 text-sm group-hover:text-gray-600" />
                      </Link>
                      
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-linear-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900">Sign Out</h4>
                            <p className="text-xs text-gray-500">See you later!</p>
                          </div>
                        </div>
                        <FaArrowRight className="text-gray-400 text-sm group-hover:text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="text-center pt-4 border-t border-gray-100 mt-4">
                      <p className="text-xs text-gray-500 font-medium">
                        ScholarStream Portal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  Login <FaArrowRight className="text-sm" />
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-4 pb-3 space-y-3">
              <ul className="space-y-3">
                {Links}
              </ul>
              
              <div className="pt-4 border-t border-gray-100 mt-4">
                {user && user.photoURL ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <img
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                        src={user.photoURL}
                        alt="User avatar"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.displayName || "Scholar"}</p>
                        <p className="text-sm text-gray-500">Welcome back!</p>
                      </div>
                    </div>
                    
                    <Link
                      to="/dashboard/overview"
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-6 h-6 bg-linear-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <div className="w-6 h-6 bg-linear-to-br from-red-500 to-pink-600 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
