import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [userToken, setUserToken] = useState(
    localStorage.getItem("Token") ? localStorage.getItem("Token") : ""
  );
  const [userData, setUserData] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/doctor/list`);

      if (data.success) {
        toast.success(data.message);
        setDoctors(data.doctors); 
      } else {
        console.log("Error: ", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    }
  };

  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
     
      if (data.success) {
        setUserData(data.userData);
        toast.success(data.message);
      } else {
        console.log("Error: ", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    userToken,
    setUserToken,
    backEndUrl,
    userData,
    setUserData,
    loadUserData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (userToken) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [userToken]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
