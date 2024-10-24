import { assets } from "@/assets/assets_frontend/assets";
import { CircleChevronRight } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap bg-indigo-500 rounded-none sm:rounded-3xl  mt-4
    px-6 md:px-10 lg:px-20  "
    >
      <div
        className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto 
       md:py-[10vw] md:[-30px] "
      >
        <p
          className="text-3xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight
        md:leading-tight lg:leading-tight"
        >
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-normal">
          <img src={assets.group_profiles} className="w-28" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          className="mt-3 flex items-center gap-2 bg-white text-indigo-600 px-6 py-2.5 
             rounded-2xl font-medium hover:bg-white hover:text-indigo-700
             hover:shadow-lg hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book Appointment
          <CircleChevronRight className="w-5 h-4" />
        </a>
      </div>

      <div className="md:w-1/2 relative ">
        <img
          src={assets.header_img}
          className="w-full md:absolute bottom-0 h-auto rounded-lg "
        />
      </div>
    </div>
  );
};

export default Header;
