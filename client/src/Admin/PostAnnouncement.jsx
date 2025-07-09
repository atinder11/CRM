import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const PostAnnouncement = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!subject || !body) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("body", body);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      const res = await fetch("http://localhost:8000/announcement", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      alert("Failed to post announcement. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <div className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-semibold flex items-center gap-2">
          <i className="bi bi-speedometer2"></i> Admin Panel
        </div>
        <button
          onClick={() => navigate("/login")}
          className="hover:bg-purple-600 bg-purple-500 px-4 py-1 rounded-md transition"
        >
          <i className="bi bi-box-arrow-right mr-1"></i> Logout
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto mt-10 px-4">
       
<button
  onClick={() => navigate("/admin")}
  className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-6"
>
  <FaArrowLeftLong className="text-lg" />
  <span className="font-medium">Back to Dashboard</span>
</button>

        <h3 className="text-3xl font-bold mb-6 text-center ">
          Post New Announcement
        </h3>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-5 border border-gray-200">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Announcement Body"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <input
            type="file"
            accept="application/pdf"
            className="w-full file:px-4 file:py-2 file:bg-purple-600 file:text-white file:rounded-md file:border-0 file:cursor-pointer"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncement;
