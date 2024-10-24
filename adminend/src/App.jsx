import React, { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointements from "./pages/admin/AllAppointements";
import AddDoctors from "./pages/admin/AddDoctors";
import DoctorsList from "./pages/admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const App = () => {
  const { DoctorToken } = useContext(DoctorContext);
  const { AdminToken } = useContext(AdminContext);

  return AdminToken || DoctorToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer position="top-right" autoClose={5000} />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointements />} />
            <Route path="/add-doctor" element={<AddDoctors />} />
            <Route path="/doctor-list" element={<DoctorsList />} />

            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointment />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Login />
    </>
  );
};

export default App;
