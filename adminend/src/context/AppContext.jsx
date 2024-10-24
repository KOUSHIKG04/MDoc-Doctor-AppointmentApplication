import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

const calculateAge = (dateStringDOB) => {
  const today = new Date();const birthDate = new Date(dateStringDOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age
}

const currency = '$'

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split("-");
  return `${dateArray[0]} ${months[parseInt(dateArray[1]) - 1]}  ${
    dateArray[2]
  }`;
};

  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;