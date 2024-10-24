import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Calendar, LayoutDashboard, UserPlus, Users } from "lucide-react";
import { AdminContext } from "@/context/AdminContext";
import { DoctorContext } from "@/context/DoctorContext";

const Sidebar = () => {
  const { AdminToken } = useContext(AdminContext);
  const { DoctorToken } = useContext(DoctorContext);

  return (
    <div className="w-64 min-h-screen text-black p-8">
      {AdminToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <Users className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Doctors List</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <Calendar className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">All Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <UserPlus className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Add Doctor</p>
            </NavLink>
          </li>
        </ul>
      )}

      {DoctorToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <Users className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Profile</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-2xl ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                } ${isActive ? "border lg:border-gray-300" : "lg:border"}`
              }
            >
              <Calendar className="w-5 h-5 mr-2 ml-2" />
              <p className="hidden md:block">Appointments</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
