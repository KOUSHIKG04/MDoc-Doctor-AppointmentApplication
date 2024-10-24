import { Button } from "@/components/ui/button";
import { AppContext } from "@/Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Doctor = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    speciality || ""
  );
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const filterData = () => {
    if (selectedSpeciality) {
      const data = doctors.filter(
        (doc) => doc.speciality === selectedSpeciality
      );
      setFilterDoc(data);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedSpeciality, doctors]);

  const handleSpecialityClick = (selected) => {
    if (selectedSpeciality === selected) {
      setSelectedSpeciality("");
      navigate("/doctors");
    } else {
      setSelectedSpeciality(selected);
      navigate(`/doctors/${selected}`);
    }
  };

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
    if (showFilter) {
      setSelectedSpeciality("");
      navigate("/doctors");
    }
  };

  return (
    <div>
      <p className="flex items-center justify-center text-xl mt-6 underline md:ml-10">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col items-center p-6">
        <Button
          onClick={handleToggleFilter}
          className={`sm:hidden bg-indigo-500 text-white mb-6 hover:bg-indigo-600 rounded-xl shadow-md`}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>

        <div
          className={`w-full max-w-[1000px] mb-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((specialityOption) => (
              <div
                key={specialityOption}
                onClick={() => handleSpecialityClick(specialityOption)}
                className={`cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 
                ${
                  selectedSpeciality === specialityOption
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {specialityOption}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 sm:px-0 mb-4">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
                hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md"
            >
              <img src={item.image} className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center 
                  ${item.available ? "text-green-500" : "text-red-500"}`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm ">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;

/** 
import { AppContext } from "@/Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Doctor = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const filterData = () => {
    const data = doctors.filter((doc) => doc.speciality === speciality);
    if (speciality) {
      setFilterDoc(data);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    filterData();
  }, [speciality, doctors]);

  return (
    <div>
      <p className="text-xl mt-6 text-left ml-12">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-[1000px] mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              onClick={() => {
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate(/doctors/General physician);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              General Physician
            </div>
            <div
              onClick={() => {
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate(/doctors/Gynecologist);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              Gynecologist
            </div>
            <div
              onClick={() => {
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate(/doctors/Dermatologist);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              Dermatologist
            </div>
            <div
              onClick={() => {
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate(/doctors/Pediatricians);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              Pediatricians
            </div>
            <div
              onClick={() => {
                speciality === " Neurologist"
                  ? navigate("/doctors")
                  : navigate(/doctors/Neurologist);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              Neurologist
            </div>
            <div
              onClick={() => {
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate(/doctors/Gastroenterologist);
              }}
              className="cursor-pointer border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 active:scale-95 active:bg-blue-200"
            >
              Gastroenterologist
            </div>
          </div>

          <div className=" mt-6 w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 sm:px-0 mb-4">
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(/appointments/${item._id})}
                className="border border-bule-200 rounded-xl overflow-hidden cursor-pointer 
                hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md"
              >
                <img src={item.image} className="bg-blue-50" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-sm ">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
 */
