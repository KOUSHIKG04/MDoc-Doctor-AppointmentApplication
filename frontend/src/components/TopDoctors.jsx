import { CircleChevronRight } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-800 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
            hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md"
          >
            <img src={item.image} className="bg-blue-50" alt={item.name} />
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
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-3 flex items-center gap-2 bg-indigo-400 text-white px-6 py-2.5 
        rounded-3xl font-medium hover:bg-indigo-200 hover:text-indigo-700
        hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        More <CircleChevronRight className="w-5 h-4" />
      </Button>
    </div>
  );
};

export default TopDoctors;
