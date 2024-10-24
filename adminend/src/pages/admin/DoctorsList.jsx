import { Input } from "@/components/ui/input";
import { AdminContext } from "@/context/AdminContext";
import React, { useContext, useEffect } from "react";

const DoctorsList = () => {
  const { AdminToken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (AdminToken) {
      getAllDoctors();
    }
  }, [AdminToken]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-10">
      <h1 className="text-3xl font-semibold ml-8 mb-8 text-gray-800">
        All Doctors
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {doctors &&
          doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
               duration-300 cursor-pointer"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="bg-indigo-100 w-24 h-24 rounded-full mx-auto mb-4 object-cover hover:bg-indigo-400"
              />
              <div className="text-center">
                <h2 className="text-xl font-medium text-gray-900">
                  {doctor.name}
                </h2>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <Input
                  onChange={() => changeAvailability(doctor._id)}
                  type="checkbox"
                  checked={doctor.available}
                  readOnly
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500"
                />
                <p
                  className={`text-sm font-semibold ${
                    doctor.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsList;
