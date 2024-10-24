import { assets } from "@/assets/assets_admin/assets";
import { AdminContext } from "@/context/AdminContext";
import { AppContext } from "@/context/AppContext";
import { CircleX, GalleryHorizontalEnd } from "lucide-react";
import React, { useContext, useEffect } from "react";

const AllAppointements = () => {
  const { AdminToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (AdminToken) {
      getAllAppointments();
    }
  }, [AdminToken]);

  return (
    <div className="mx-5 sm:mx-14 mt-5">
      <div className="bg-white border rounded-xl shadow-lg">
        <div className="flex items-center gap-2.5 py-4 px-6 bg-gray-50 rounded-t-xl border-b">
          <GalleryHorizontalEnd />
          <h1 className="text-2xl font-medium text-gray-800">
            All Appointments
          </h1>
        </div>

        <div
          className="pb-3 px-6 max-h-[500px] overflow-y-auto"
          style={{ maxHeight: "500px" }}
        >
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between max-sm:gap-2
                  sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500
                  grid-flow-col py-3 px-4 sm:px-6 hover:bg-gray-50 cursor-pointer
                  border-b last:border-b-0"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-1">
                  <img
                    className="w-8 rounded-full object-cover"
                    src={appointment.userData.image}
                    alt=""
                  />
                  <p>{appointment.userData.name}</p>
                </div>
                <p className="hidden sm:block mt-1.5">
                  {calculateAge(appointment.userData.dob)}
                </p>
                <p className="mt-1.5 text-sm">
                  {slotDateFormat(appointment.slotDate)} |{" "}
                  {appointment.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full bg-indigo-200 object-cover"
                    src={appointment.doctorData.image}
                    alt=""
                  />
                  <p>{appointment.doctorData.name}</p>
                </div>
                <p className="mt-1.5 font-medium text-gray-700 text-sm">
                  {currency}
                  {appointment.amount}
                </p>

                {appointment.cancelled ? (
                  <p className="text-red-500 text-xs font-medium mt-1.5">
                    Cancelled
                  </p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium mt-1.5">
                    Completed
                  </p>
                ) : (
                  <CircleX
                    onClick={() => cancelAppointment(appointment._id)}
                    className="h-5 w-10 mt-1.5 cursor-pointer text-red-400 hover:text-red-500
                    transition-transform duration-150 hover:scale-110"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointements;
