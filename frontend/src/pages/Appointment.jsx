import { assets } from "@/assets/assets_frontend/assets";
import RelatedDoc from "@/components/RelatedDoc";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import { ArrowRight, CircleChevronRight } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Appointement = () => {
  const { doctors, currencySymbol, backEndUrl, userToken, getDoctorsData } =
    useContext(AppContext);
  const { docId } = useParams();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let date = new Date(today);
      date.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(date.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === date.getDate()) {
        date.setHours(date.getHours() > 10 ? date.getHours() + 1 : 10);
        date.setMinutes(date.getMinutes() > 30 ? 30 : 0);
      } else {
        date.setHours(10);
        date.setMinutes(0);
      }

      let timeSlots = [];
      while (date < endTime) {
        let formatTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
        const slotTime = formatTime;

        const slotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (slotAvailable) {
          timeSlots.push({
            datetime: new Date(date),
            time: formatTime,
          });
        }

        date.setMinutes(date.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!userToken) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    try {
      const date = docSlot[slotIndex][0].datetime;

      const slotDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      console.log(slotDate);

      const { data } = await axios.post(
        `${backEndUrl}/api/user/book-appointment`,
        {
          doctorId: docId,
          slotDate,
          slotTime: slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Doctor is not available at this time/ Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="mb-4 mt-2 ">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={docInfo?.image}
              className="bg-indigo-200 rounded-none sm:rounded-3xl w-full sm:max-w-72 shadow-lg"
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg">
            <p className="flex items-center gap-2 text-xl text-gray-700 font-medium">
              {docInfo?.name}{" "}
              <img src={assets.verified_icon} className="w-5 h-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p className="text-gray-600 mt-2">
                {docInfo?.degree} -{" "}
                <span className="text-indigo-600">{docInfo?.speciality}</span>
              </p>
              <Button variant="secondary" className="mt-2 h-7 rounded-3xl">
                {docInfo?.experience}
              </Button>
            </div>

            <div className="mt-2">
              <p className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <span>About</span>
                <img
                  src={assets.info_icon}
                  alt="Info Icon"
                  className="w-4 h-4"
                />
              </p>
              <p className="text-gray-700 mt-1 leading-relaxed">
                {docInfo?.about}
              </p>
            </div>
            <p className="mt-2 text-md font-medium text-gray-900 flex items-center space-x-2">
              Appointment fee:
              <span className="ml-2 text-indigo-600">
                {currencySymbol}
                {docInfo?.fees}
              </span>
            </p>
          </div>
        </div>

        <div className="sm:pl-4 p-6 mt-10 font-medium text-gray-700">
          <p className="text-md sm:text-lg">Booking slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 whitespace-nowrap scrollbar-hide">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-[4rem] rounded-full cursor-pointer 
            ${
              slotIndex === index
                ? "bg-indigo-500 text-white"
                : "border border-gray-300"
            } 
            hover:bg-indigo-300 hover:text-white transition-colors`}
                >
                  <p className="text-xs sm:text-sm">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 whitespace-nowrap scrollbar-hide">
            {docSlot.length > 0 &&
              docSlot[slotIndex]?.map((item, index) => (
                <p
                  className={`text-xs sm:text-sm flex-shrink-0 px-3 py-1 sm:px-5 sm:py-2 rounded-full cursor-pointer
            ${
              slotTime === item.time
                ? "bg-indigo-500 text-white"
                : "bg-gray-50 border"
            }
            hover:bg-indigo-300 hover:text-white transition-colors`}
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <div className="mt-4 flex justify-end items-center text-indigo-600">
            <p className="text-xs">Select & Scroll to see more slots</p>
            <ArrowRight className="ml-1 animate-bounce-right h-4" />
          </div>

          <div className="flex justify-center sm:justify-start mt-3">
            <Button
              onClick={bookAppointment}
              className="w-full sm:w-auto flex items-center gap-2 bg-indigo-500 text-white py-2.5 
      rounded-2xl font-medium hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:scale-105 
      transition-all duration-300"
            >
              Book Appointment
              <CircleChevronRight className="w-5 h-4" />
            </Button>
          </div>
        </div>

        <RelatedDoc docId={docId} speciality={docInfo?.speciality} />
      </div>
    )
  );
};

export default Appointement;
