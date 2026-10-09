import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

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

    if (!formData.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.gender)
      newErrors.gender = "Please select a gender";

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    try {
      setErrors({});

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      setSuccess("Account created successfully!");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        gender: "",
      });

    } catch (error) {

      if (error.response && error.response.data.message) {
        setSuccess(error.response.data.message);
      } else {
        setSuccess("Registration failed");
      }

    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white items-center justify-center px-8 lg:px-16 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-md lg:max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            Join OutfitAI Today
          </h1>
          <p className="mt-6 text-base lg:text-lg text-white/90">
            AI-powered outfit recommendations tailored to your climate, season and occasion.
          </p>
          <div className="mt-8 space-y-3 text-sm lg:text-base text-white/90">
            <p>✔ Personalized Styling</p>
            <p>✔ Climate Aware</p>
            <p>✔ Occasion Smart</p>
            <p>✔ Festival Ready</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="w-full max-w-sm sm:max-w-md bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40">

          {/* Logo */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-black">Outfit</span>
              <span className="text-pink-600">AI</span>
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Create your account
            </p>
          </div>

          {success && (
            <p className="text-green-600 text-center mb-3 font-medium">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer text-gray-500 text-sm select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full mt-2 px-4 py-2.5 sm:py-3 rounded-full border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-white`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 sm:py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-medium"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}