import React from "react";
import { specialityData } from "@/assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <div
      id="speciality"
      className="flex  flex-col items-center gap-6 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div
        className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 
          w-full justify-items-center"
      >
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col items-center cursor-pointer
              hover:translate-y-[-5px] transition-all duration-300 text-center   "
          >
            <img
              src={item.image}
              className="w-16 sm:w-24 mb-2 hover:shadow-md rounded-full"
              alt={item.speciality}
            />
            <p className="text-sm font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
