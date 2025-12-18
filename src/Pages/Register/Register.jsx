import React, { useState } from "react";
import img from "../../assets/undraw_authentication_1evl (1).svg";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUser, setUser, signInGoogle } = useAuth();

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must have at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must have at least one lowercase letter.");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser({
            ...user,
            displayName: name,
            photoURL: photo,
          });

          const userInfo = {
            name: name,
            email: email,
            photo: photo,
            createAt: new Date(),
          };

          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign Up Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            });
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
      });
  };

  const handleGoogleLogin = () => {
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
              title: "Sign Up Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
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
      });
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center w-9/12 mx-auto">
      <div className=" font-display text-text-main flex items-center justify-center p-6 flex-1 ">
        <div className="w-full max-w-[460px] mx-auto ">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">
              Create Your Account
            </h1>
            <p className="text-text-sub text-sm font-normal">
              Welcome back! Please enter your details
            </p>
          </header>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-border-light rounded-lg py-2.5 px-4  transition-colors duration-200 mb-6 group hover:bg-primary"
          >
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
              Sign up with Google
            </span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="h-px bg-gray-200 w-full"></div>
            <span className="absolute  px-3 text-xs text-gray-400 font-medium uppercase">
              OR
            </span>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label
                className="block text-sm font-bold text-dark mb-1.5"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-dark placeholder-gray-400 focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                type="text"
              />
            </div>

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
              <label
                className="block text-sm font-bold text-dark mb-1.5"
                htmlFor="password"
              >
                Image URL
              </label>
              <div className="relative">
                <input
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-dark placeholder-gray-400 focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all pr-10 tracking-widest"
                  id="photo"
                  name="photo"
                  placeholder="image URL"
                  required
                  type="text"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-bold text-dark mb-1.5"
                htmlFor="confirm-password"
              >
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
            </div>

            <div className="flex items-start gap-2 pt-1">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 rounded border-gray-300 text-dark focus:ring-dark cursor-pointer"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                />
              </div>
              <label
                className="text-sm text-gray-600 cursor-pointer select-none"
                htmlFor="terms"
              >
                I accepted all terms &amp; conditions.
              </label>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              className="w-full bg-[#1A1A1A] text-white font-bold rounded-lg py-3  transition-all duration-300 shadow-sm mt-2 hover:bg-primary"
              type="submit"
            >
              SIGN UP
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="font-bold text-dark hover:underline ml-0.5 hover:text-primary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img src={img} alt="Auth" />
      </div>
    </div>
  );
};

export default Register;
