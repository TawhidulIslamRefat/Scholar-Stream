import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from '../../../assets/scholarship (1).png'

const Navbar = () => {
    const Links = <>
        <li ><NavLink>Home</NavLink></li>
        <li ><NavLink>All Scholarships</NavLink></li>
    </>
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar  w-10/12 mx-auto">
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

          <Link to='/' className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8" />
            <a className="text-xl font-semibold">ScholarStream</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {Links}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <Link to='/login' className="font-medium text-primary flex items-center gap-1">Login <FaArrowRight className="text-sm" /></Link>
          <Link to='/register' className="btn bg-primary rounded-4xl text-white">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
