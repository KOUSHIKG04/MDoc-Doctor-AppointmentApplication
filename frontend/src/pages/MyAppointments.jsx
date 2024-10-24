import { Button } from "@/components/ui/button";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import { LogIn } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAppointements = () => {
  const { backEndUrl, userToken, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return `${dateArray[0]} ${months[parseInt(dateArray[1]) - 1]}  ${
      dateArray[2]
    }`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/appointments`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/user/cancel-appointment`,
        {
          appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPayment = async (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "DocApp",
      description: "Test Transaction",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backEndUrl}/api/user/verify-payment`,
            response,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (data.success) {
            getUserAppointments();
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const razorpay = new window.Razorpay(option);
    razorpay.open();
  };

  const razorpayPayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/user/razorpay-payment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (data.success) {
        initPayment(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    if (userToken) {
      getUserAppointments();
      getDoctorsData();
    }
  }, [backEndUrl, userToken]);

  return (
    <div>
      <p className="pb-3 mt-4 font-medium text-zinc-700 ml-4 border-b ">
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="
          grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b px-4 mt-2.5   "
          >
            <div>
              <img
                src={item.doctorData.image}
                className="w-32 bg-indigo-50 rounded-lg mb-3"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.doctorData.name}
              </p>
              <p>{item.doctorData.speciality} </p>
              <p className="text-zinc-700 font-medium mt-1 ">Address: </p>
              <p className="text-xs">{item.doctorData.address.line1}</p>
              <p className="text-xs">{item.doctorData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                <span>
                  {" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}{" "}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <Button
                  onClick={() => razorpayPayment(item._id)}
                  className=" text-white bg-green-400 rounded-2xl
               hover:text-white  sm:min-w-48"
                >
                  Paid
                </Button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <Button
                  onClick={() => razorpayPayment(item._id)}
                  className=" text-white bg-indigo-400 rounded-2xl
                hover:bg-indigo-600 hover:text-white  sm:min-w-48"
                >
                  Pay Online
                </Button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <Button
                  onClick={() => cancelAppointment(item._id)}
                  className="mb-2 flex items-center gap-2 bg-indigo-50 text-black px-6 
                py-2.5 rounded-2xl font-medium hover:bg-red-100 hover:text-black
                hover:shadow-lg hover:scale-105 transition-all duration-300 sm:min-w-48"
                >
                  Cancel Appointment
                </Button>
              )}
              {item.cancelled && !item.isCompleted && (
                <Button
                  className="text-red-500 px-6 py-2.5
                sm:min-w-48 bg-red-100 rounded-2xl hover:bg-red-100"
                >
                  Appointment Cancelled
                </Button>
              )}
              {
                item.isCompleted && (
                  <Button  className="text-green-500 px-6 py-2.5
                  sm:min-w-48 bg-green-100 rounded-2xl hover:bg-green-100">Completed</Button>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointements;
