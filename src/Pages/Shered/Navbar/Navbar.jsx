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
        <NavLink className='font-medium text-sm'>Home</NavLink>
      </li>
      <li>
        <NavLink className='font-medium text-sm'>All Scholarships</NavLink>
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
                  className="dropdown-content menu bg-base-300 rounded-box z-1 w-65 p-2 shadow-sm mt-16"
                >
                  <div>
                    <button
                      className=" btn bg-gray-900 hover:bg-primary text-white w-full text-[12px] md:text-[15px] my-1 md:my-2"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
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
