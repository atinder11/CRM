import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostAnnouncement from "./Admin/PostAnnouncement";
import AdminDashboard from "./Admin/AdminDashboard";
import UserProfileForm from './components/UserProfileForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/announcement" element={<PostAnnouncement />} />
        <Route path='/profile-builder' element={<UserProfileForm/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
