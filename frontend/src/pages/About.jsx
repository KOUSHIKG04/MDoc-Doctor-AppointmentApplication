import { assets } from "@/assets/assets_frontend/assets";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="my-5 flex flex-col md:flex-row gap-12 rounded-xl">
        <img
          className="w-full md:max-w-[460px] mt-6 rounded-none sm:rounded-xl"
          src={assets.about_image}
          alt=""
        />
        <div className="p-6 flex flex-col justify-center gap-6 md:w-2/4 w-full text-sm text-gray-600">
          <div className=" text-2xl text-gray-600 ">
            <p>
              About <span className="text-gray-800 font-medium">US</span>
            </p>
          </div>
          <p className="w-full">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="w-full">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <div className="w-full">
            <b className="text-gray-700">Our Vision</b>
            <p className="w-full">
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl mt-12 mb-4 text-center ">
        <p className="ml-2">
          WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 p-6">
        <div
          className="rounded-l-2xl border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-2 text-[15px] 
        hover:bg-indigo-500 hover:text-white cursor-pointer"
        >
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div
          className=" border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-2 text-[15px] 
        hover:bg-indigo-500 hover:text-white cursor-pointer"
        >
          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div
          className="rounded-r-2xl border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-2 text-[15px] 
        hover:bg-indigo-500 hover:text-white cursor-pointer"
        >
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
