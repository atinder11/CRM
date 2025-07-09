// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//     position: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("loggedIn");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (loggedIn && user) {
//       navigate(user.role === "admin" ? "/admin" : "/dashboard");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//     e.preventDefault();

//     const { name, email, password, role, position } = formData;

//     if (!name || !email || !password || !role || !position) {
//       setError("Please fill all fields.");
//       setSuccess("");
//       return;
//     }

//     if (!email.endsWith("@rstartec.com")) {
//       setError("Only @rstartec.com emails are allowed.");
//       setSuccess("");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:8000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role, position }),
//       });

//       const data = await res.json();

//      if (res.status === 201 && data.token && data.user) {
//   localStorage.setItem("token", data.token);
//   localStorage.setItem("user", JSON.stringify(data.user));
//   navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     const { name, email, password, role, position } = formData;
//
//     if (!name || !email || !password || !role || !position) {
//       setError("Please fill all fields.");
//       setSuccess("");
//       return;
//     }
//
//     if (!email.endsWith("@rstartec.com")) {
//       setError("Only @rstartec.com emails are allowed.");
//       setSuccess("");
//       return;
//     }
//
//     try {
//       const res = await fetch("http://localhost:8000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role, position }),
//       });
//
//       const data = await res.json();
//
//      if (res.status === 201 && data.token && data.user) {
//   localStorage.setItem("token", data.token);
//   localStorage.setItem("user", JSON.stringify(data.user));
//   dispatch(setProfileData(data.user));
//   navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
// } else {
//         setError(data.error || "Registration failed.");
//         setSuccess("");
//       }
//     } catch {
//       setError("Something went wrong.");
//       setSuccess("");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
//       <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row">
        
//         {/* Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-10 bg-neutral text-neutral-content">
//           <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
//           <p className="text-center text-sm mb-6 text-gray-300">Create your account to continue</p>

//           {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
//           {success && <div className="alert alert-success mb-4 py-2">{success}</div>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="input input-bordered w-full text-black"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email address (@rstartec.com)"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="input input-bordered w-full text-black"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="input input-bordered w-full text-black"
//             />
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//               className="select select-bordered w-full text-black"
//             >
//               <option value="">Select role</option>
//               <option value="Tech">Tech</option>
//               <option value="Sales">Sales</option>
//               <option value="Management">Management</option>
//             </select>
//             <input
//               type="text"
//               name="position"
//               placeholder="Position"
//               value={formData.position}
//               onChange={handleChange}
//               required
//               className="input input-bordered w-full text-black"
//             />
//             <button type="submit" className="btn btn-primary w-full">Register</button>
//           </form>

//           <div className="text-center mt-6">
//             <p className="text-sm mb-2">Already have an account?</p>
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full border border-black text-black bg-white hover:bg-gray-100 transition-all rounded-lg py-2"
//             >
//               Login
//             </button>
//           </div>
//         </div>

//         {/* Image Section */}
//         <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 flex flex-col justify-center items-center text-center">
//           <h1 className="text-4xl font-bold mb-4">
//             Welcome to <br />
//             <span className="text-white">rStar Portal</span>
//           </h1>
//           <p className="mb-6">Sign up to access your account</p>
//           <img
//             src="/assets/login.png"
//             alt="Signup Illustration"
//             className="w-4/5 max-w-xs"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
































import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Signup component - Handles new user registration with validation,
 * backend integration, role-based redirection, and basic error handling.
 */
const Signup = () => {
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    position: "",
  });

  // Error and success message state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Redirect if already logged in
   */
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (loggedIn && user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [navigate]);

  /**
   * Handle input change for all form fields
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle form submission: validate inputs, then call backend API
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role, position } = formData;

    // Frontend validation
    if (!name || !email || !password || !role || !position) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    if (!email.endsWith("@rstartec.com")) {
      setError("Only @rstartec.com emails are allowed.");
      setSuccess("");
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      // Send data to backend
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, position }),
      });

      const data = await res.json();

      // If registration successful, store token and redirect
      if (res.status === 201 && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError(data.error || "Registration failed.");
        setSuccess("");
      }
    } catch {
      setError("Something went wrong.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-6xl bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col-reverse md:flex-row">

        {/* -------------------- Left: Form Section -------------------- */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-neutral text-neutral-content">
          <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
          <p className="text-center text-sm mb-6 text-gray-300">
            Create your account to continue
          </p>

          {/* Display error/success messages */}
          {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
          {success && <div className="alert alert-success mb-4 py-2">{success}</div>}

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address (@rstartec.com)"
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="select select-bordered w-full text-black"
            >
              <option value="">Select role</option>
              <option value="Tech">Tech</option>
              <option value="Sales">Sales</option>
              <option value="Management">Management</option>
            </select>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              required
              className="input input-bordered w-full text-black"
            />
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          {/* Redirect to Login */}
          <div className="text-center mt-6">
            <p className="text-sm mb-2">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full border border-black text-black bg-white hover:bg-gray-100 transition-all rounded-lg py-2"
            >
              Login
            </button>
          </div>
        </div>

        {/* -------------------- Right: Illustration Section -------------------- */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <br />
            <span className="text-white">rStar Portal</span>
          </h1>
          <p className="mb-6">Sign up to access your account</p>
          <img
            src="/assets/login.png"
            alt="Signup Illustration"
            className="w-4/5 max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
