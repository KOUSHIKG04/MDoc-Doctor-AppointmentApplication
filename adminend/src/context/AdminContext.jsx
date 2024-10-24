import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [AdminToken, setAdminToken] = useState(
    localStorage.getItem("AdminToken") ? localStorage.getItem("AdminToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    if (AdminToken) {
      localStorage.setItem("AdminToken", AdminToken);
    } else {
      localStorage.removeItem("AdminToken");
    }
  }, [AdminToken]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/admin/all-doctors`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const changeAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/admin/change-availability`,
        {
          doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${AdminToken}`,
        },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/admin/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${AdminToken}`,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const value = {
    AdminToken,
    setAdminToken,
    backEndUrl,
    getAllDoctors,
    doctors,
    changeAvailability,
    getAllAppointments,
    appointments,
    setAppointments,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
