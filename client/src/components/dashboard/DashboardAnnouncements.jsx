import React from "react";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";

const DashboardAnnouncements = ({ announcements }) => (
  <div>
    <h4 className="text-xl font-semibold mb-4 text-purple-700">Announcements</h4>
    <ul className="space-y-4">
      {announcements.length === 0 ? (
        <li className="text-center text-gray-500">No announcements found.</li>
      ) : (
        announcements.map((a, index) => (
          <li key={index} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <h5 className="text-lg font-semibold text-purple-800 mb-1">{a.subject}</h5>
            <p className="text-gray-700 mb-2">{a.body}</p>
            <small className="text-sm text-gray-500 block mb-3">
              {new Date(a.date).toLocaleString()}
            </small>
            {a.attachment && a.attachment.endsWith(".pdf") && (
              <a
                href={`${import.meta.env.VITE_API_BASE_URL?.startsWith('/api') ? '' : import.meta.env.VITE_API_BASE_URL || ''}${a.attachment}`}
                download
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
              >
                <BsFileEarmarkArrowDownFill className="text-lg" />
                Download Attachment
              </a>
            )}
          </li>
        ))
      )}
    </ul>
  </div>
);

export default DashboardAnnouncements;
