import React, { useState } from "react";
import axios from "axios";
 
const UserProfileForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    workNumber: "",
    location: "",
    shift: "",
    skills: "",
    aboutMe: "",
    maritalStatus: "",
    address: "",
    education: "",
    profilePic: null,
  });
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    // Add userId from localStorage user object
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      data.append("userId", user._id);
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/profile`,
        data,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert("Failed to submit profile");
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Build Your Profile
            </h2>
            <p className="text-white text-md md:text-lg mb-6 text-center">
              Showcase your skills and professional details
            </p>
            <img
              src="/assets/login.png"
              alt="Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
 
        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
              ✨ Profile Builder
            </h2>
 
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              encType="multipart/form-data"
            >
              <InputField label="Full Name" name="name" onChange={handleChange} />
              <InputField
                label="Email ID"
                name="email"
                type="email"
                onChange={handleChange}
              />
              <InputField
                label="Work Number"
                name="workNumber"
                type="number"
                onChange={handleChange}
              />
              <InputField
                label="Location"
                name="location"
                onChange={handleChange}
              />
              <SelectField
                label="Shift"
                name="shift"
                value={form.shift}
                onChange={handleChange}
                options={["Day", "Night", "Rotational"]}
              />
              <InputField label="Skill Set" name="skills" onChange={handleChange} />
              <SelectField
                label="Marital Status"
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                options={["Single", "Married"]}
              />
 
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePic"
                  required
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 file:bg-purple-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition"
                  onChange={handleChange}
                />
              </div>
 
              <TextareaField
                label="Address"
                name="address"
                onChange={handleChange}
              />
              <TextareaField
                label="About Me"
                name="aboutMe"
                onChange={handleChange}
              />
              <TextareaField
                label="Education Details"
                name="education"
                onChange={handleChange}
              />
 
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition shadow-lg"
                >
                   Submit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default UserProfileForm;
 

// Reusable Components for Clean Code  //

 
const InputField = ({ label, name, type = "text", onChange }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required
      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition"
      onChange={onChange}
    />
  </div>
);
 
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      {label}
    </label>
    <select
      name={name}
      required
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
 
const TextareaField = ({ label, name, onChange }) => (
  <div className="md:col-span-2">
    <label className="block mb-2 text-sm font-semibold text-gray-700">
      {label}
    </label>
    <textarea
      name={name}
      required
      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm hover:shadow-md transition"
      onChange={onChange}
    ></textarea>
  </div>
);