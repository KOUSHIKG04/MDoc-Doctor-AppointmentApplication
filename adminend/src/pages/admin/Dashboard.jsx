import { assets } from "@/assets/assets_admin/assets";
import { AdminContext } from "@/context/AdminContext";
import { AppContext } from "@/context/AppContext";
import { CircleX } from "lucide-react";
import React, { useContext, useEffect } from "react";

const Dashboard = () => {
  const { AdminToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (AdminToken) {
      getDashData();
    }
  }, [AdminToken]);

  return (
    dashData && (
      <div className="min-h-screen bg-gray-50 py-6 px-10">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800 ml-5">
          Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          <div
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
              duration-300"
          >
            <div className="flex items-center">
              <img
                src={assets.doctor_icon}
                alt="Doctors"
                className="w-16 h-16 mr-4"
              />
              <div>
                <p className="text-4xl font-bold text-gray-900">
                  {dashData.doctors}
                </p>
                <p className="text-gray-600 text-lg">Doctors</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
              duration-300"
          >
            <div className="flex items-center">
              <img
                src={assets.appointments_icon}
                alt="Appointments"
                className="w-16 h-16 mr-4  "
              />
              <div>
                <p className="text-4xl font-bold text-gray-900">
                  {dashData.appointments}
                </p>
                <p className="text-gray-600 text-lg">Appointments</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
              duration-300"
          >
            <div className="flex items-center">
              <img
                src={assets.patients_icon}
                alt="Patients"
                className="w-16 h-16 mr-4"
              />
              <div>
                <p className="text-4xl font-bold text-gray-900">
                  {dashData.users}
                </p>
                <p className="text-gray-600 text-lg">Patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-10 border rounded-xl shadow-lg mx-5">
          <div className="flex items-center gap-2.5 py-4 px-6 bg-gray-50 rounded-t-xl border-b">
            <img src={assets.list_icon} alt="List Icon" />
            <h1 className="text-2xl font-medium text-gray-800">
              Latest Appointments
            </h1>
          </div>

          <div
            className="py-4 px-6 h-72 overflow-y-auto"
            style={{ maxHeight: "450px" }}
          >
            {dashData.latestAppointment &&
            dashData.latestAppointment.length > 0 ? (
              dashData.latestAppointment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-3 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item?.doctorData?.image || assets.default_doctor_avatar
                      }
                      alt={item?.doctorData?.name || "Doctor"}
                      className="w-12 h-12 rounded-full object-cover bg-indigo-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item?.doctorData?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {slotDateFormat(item.slotDate) || "Unknown Date"}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 text-xs font-medium mt-1.5">
                      Cancelled
                    </p>
                  ) : (
                    <CircleX
                      onClick={() => cancelAppointment(item._id)}
                      className="h-5 w-10 mt-1.5 cursor-pointer text-red-400 hover:text-red-500
              transition-transform duration-150 hover:scale-110"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No latest appointments available.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
