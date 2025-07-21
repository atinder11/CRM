import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileData } from "../redux/profileSlice";
 
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
 
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
 
      const data = await res.json();
if (res.ok && data.token) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  dispatch(setProfileData(data.user));
 
  const role = data.user.role.toLowerCase();
  navigate(role === "admin" || role === "management" ? "/admin" : "/dashboard");
} else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row">
 
        {/* ---------- Left: Login Form Section ---------- */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-neutral text-neutral-content">
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-sm mb-6 text-gray-300">Enter your credentials</p>
 
          {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
 
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black"
            />
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
 
          {/* Sign Up redirect */}
          <div className="text-center mt-6">
            <p className="text-sm mb-2">Don't have an account?</p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full border border-black text-black bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg py-2"
            >
              Sign Up
            </button>
          </div>
        </div>
 
        {/* ---------- Right: Image + Welcome Section ---------- */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4 leading-snug">
            Welcome to <br />
            <span className="text-white">rStar Portal</span>
          </h1>
          <p className="mb-6">Secure login to access your dashboard</p>
          <img
            src="/assets/login.png"
            alt="Login Illustration"
            className="w-4/5 max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 