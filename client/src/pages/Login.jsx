import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Admin shortcut login
    if (email === "admin@rstartec.com" && password === "admin") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      navigate("/admin");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError(data.error || "Login failed!");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-neutral text-neutral-content">
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <p className="text-center text-sm mb-6 text-gray-300">
            Enter your account details
          </p>

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

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <br />
            <span className="text-white">rStar Portal</span>
          </h1>
          <p className="mb-6">Login to access your account</p>
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
