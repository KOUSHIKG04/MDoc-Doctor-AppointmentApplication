import { LogOut, Stethoscope } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AdminContext } from "@/context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "@/context/DoctorContext";

const Navbar = () => {
  const { AdminToken, setAdminToken } = useContext(AdminContext);
  const { DoctorToken, setDoctorToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    AdminToken && setAdminToken("");
    AdminToken && localStorage.removeItem("AdminToken");
    DoctorToken && setDoctorToken("");
    DoctorToken && localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <div className="flex justify-evenly  items-center p-4">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Stethoscope className="text-indigo-600 w-6 h-6 mt-1" />
        <p className="text-xl font-semibold text-gray-800 ">MDoc</p>
        <p className="text-xs border px-2 py-[1.5px] rounded-full mt-0.5">
          {AdminToken ? "ADMIN" : "DOCTOR"}
        </p>
      </div>
      <div className="flex items-center  cursor-pointer">
        <Button
          onClick={handleLogout}
          className="flex items-center text-xs gap-2 bg-indigo-500 text-white  
             rounded-2xl font-medium hover:bg-indigo-600 hover:text-white"
        >
          LOGOUT
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
