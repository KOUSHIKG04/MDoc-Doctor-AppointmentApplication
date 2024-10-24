import { AdminContext } from "@/context/AdminContext";
import { AppContext } from "@/context/AppContext";
import { DoctorContext } from "@/context/DoctorContext";
import { CircleCheck, CircleX, GalleryHorizontalEnd } from "lucide-react";
import React, { useContext, useEffect } from "react";

const DoctorAppointment = () => {
  const {
    DoctorToken,
    appointments,
    getAllAppointments,
    appointmentComplete,
    appointmentCancel,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (DoctorToken) {
      getAllAppointments();
    }
  }, [DoctorToken]);

  return (
    <div className="mx-4 sm:mx-14 mt-3">
      <div className="bg-white border rounded-xl shadow-lg">
        <div className="flex items-center gap-2.5 py-4 px-6 bg-gray-50 rounded-t-xl border-b">
          <GalleryHorizontalEnd />
          <h1 className="text-2xl font-medium text-gray-800">Appointments</h1>
        </div>

        <div
          className="pb-3 px-6 max-h-[75vh] min-h-[50vh] overflow-y-auto"
          style={{ maxHeight: "500px" }}
        >
          <div
            className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]
            gap-1 py-3 px-6 border-b"
          >
            <div>#</div>
            <div>Patient</div>
            <div>Payment</div>
            <div>Age</div>
            <div>Date & Time</div>
            <div>Fees</div>
            <div>Action</div>
          </div>

          {appointments && appointments.length > 0 ? (
            appointments.reverse().map((appointment, index) => (
              <div
                key={index}
                className={`flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base 
                sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b
                text-gray-500 hover:bg-gray-100 `}
              >
                <div className="max-sm:hidden">{index + 1}</div>
                <div className="flex items-center gap-1">
                  <img
                    className="w-8 rounded-full"
                    src={appointment.userData.image}
                    alt={appointment.userData.name}
                  />
                  <p className="ml-1.5">{appointment.userData.name}</p>
                </div>
                <div>
                  <p className="text-xs inline border border-gray-400 px-2 rounded-full">
                    {appointment.payment ? "Online" : "CASH"}
                  </p>
                </div>
                <div>
                  <p className="hidden sm:block mt-0.5">
                    {calculateAge(appointment.userData.dob)}
                  </p>
                </div>
                <div>
                  <p className="mt-1.5 text-sm">
                    {slotDateFormat(appointment.slotDate)} |{" "}
                    {appointment.slotTime}
                  </p>
                </div>
                <div>
                  {currency}
                  {appointment.amount}
                </div>

                {appointment.cancelled ? (
                  <p className="text-red-500 text-xs font-medium mt-1.5">
                    Cancelled
                  </p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium mt-1.5">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <CircleX
                      onClick={() => appointmentCancel(appointment._id)}
                      className="h-5 mr-1 mt-1.5 cursor-pointer text-red-400 hover:text-red-500
                      transition-transform duration-150 hover:scale-110"
                    />
                    <CircleCheck
                      onClick={() => appointmentComplete(appointment._id)}
                      className="h-5 mt-1.5 cursor-pointer text-green-400 hover:text-green-500
                      transition-transform duration-150 hover:scale-110"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No appointments available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
