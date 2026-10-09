import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      // Call backend login API
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      // If login successful
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        // Show backend error message
        alert(res.data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT SIDE (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white items-center justify-center px-8 lg:px-16 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-md lg:max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            Welcome Back
          </h1>
          <p className="mt-6 text-base lg:text-lg text-white/90">
            Login to OutfitAI and get AI-powered outfit recommendations tailored to your climate, season, and occasion.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="w-full max-w-sm sm:max-w-md bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40">

          {/* Logo */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-black">Outfit</span>
              <span className="text-pink-600">AI</span>
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer text-gray-500 text-sm select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 sm:py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-medium"
            >
              Login
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 font-medium hover:underline">
              Register
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}