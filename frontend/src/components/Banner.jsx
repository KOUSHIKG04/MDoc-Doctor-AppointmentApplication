import { assets } from "@/assets/assets_frontend/assets";
import { CircleChevronRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex bg-indigo-500 px-6 sm:px-10 md:px-14 lg:px-12 rounded-none sm:rounded-3xl
        mt-4 my-20 md:mx-10"
    >
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p
            className="text-3xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight
             md:leading-tight lg:leading-tight"
          >
            Book Appointment
            <span className="mt-4">With 100+ Trusted Doctors</span>
          </p>
        </div>

        <Button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-3 flex items-center gap-2 bg-white text-indigo-600 px-6 py-2.5 
             rounded-2xl font-medium hover:bg-white hover:text-indigo-700
             hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Create Account
          <CircleChevronRight className="w-5 h-4" />
        </Button>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          src={assets.appointment_img}
          className="w-full absolute bottom-0 right-0 max-w-md mt-4"
        />
      </div>
    </div>
  );
};

export default Banner;
