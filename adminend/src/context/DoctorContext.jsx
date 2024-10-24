import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [DoctorToken, setDoctorToken] = useState(
    localStorage.getItem("Token") ? localStorage.getItem("Token") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backEndUrl}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${DoctorToken}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const appointmentComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/doctor/complete-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${DoctorToken}`,
          },
        }
      );
      if (data.success) {
        getAllAppointments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const appointmentCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/doctor/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${DoctorToken}`,
          },
        }
      );
      if (data.success) {
        getAllAppointments();
        toast.success(data.message);
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
      const { data } = await axios.get(`${backEndUrl}/api/doctor/dashboard`, {
        headers: {
          Authorization: `Bearer ${DoctorToken}`,
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

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/doctor/profile`, {
        headers: {
          Authorization: `Bearer ${DoctorToken}`,
        },
      });

      if (data.success) {
        setProfileData(data.doctorData);
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
    DoctorToken,
    setDoctorToken,
    backEndUrl,
    getAllAppointments,
    appointments,
    setAppointments,
    appointmentComplete,
    appointmentCancel,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
