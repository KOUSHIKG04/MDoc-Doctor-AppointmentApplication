import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { DoctorContext } from "@/context/DoctorContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    DoctorToken,
    getProfileData,
    profileData,
    setProfileData,
    backEndUrl,
  } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: Number(profileData.fees),
        address: profileData.address,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backEndUrl}/api/doctor/update-profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${DoctorToken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (DoctorToken) {
      getProfileData();
    }
  }, [DoctorToken]);

  return (
    profileData && (
      <div className="container mx-auto my-4">
        <div className="bg-white shadow-md rounded-lg max-w-5xl mx-auto">
          <div className="relative h-1 rounded-t-lg"></div>

          <div className="relative flex justify-center">
            <img
              className="w-32 h-32 mt-4 rounded-full border-2 border-gray-400
               bg-indigo-50 object-cover"
              src={profileData.image}
              alt={profileData.name}
            />
          </div>

          <div className="text-center mt-4 px-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Dr. {profileData.name}
            </h2>
            <p className="text-gray-500 mt-2">
              {profileData.degree} - {profileData.speciality}
            </p>
            <Button className="rounded-xl mt-2 bg-indigo-400 text-white hover:bg-indigo-500">
              {profileData.experience} Years of Experience
            </Button>
          </div>

          <div className="border-t px-8 py-4 mt-6">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800">About</h3>
              <p className="text-gray-600">
                {isEdit ? (
                  <textarea
                    rows="3"
                    className="border border-gray-300 p-2 rounded w-full "
                    value={profileData.about}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.about || "No details provided."
                )}
              </p>
            </div>

            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium text-gray-800">
                  Appointment Fee:
                </h3>
                {isEdit ? (
                  <input
                    type="number"
                    className="border border-gray-300 p-2 rounded"
                    onChange={(e) => {
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }));
                    }}
                    value={profileData.fees}
                  />
                ) : (
                  <p className="text-gray-600">
                    <span className="font-semibold">{currency}</span>{" "}
                    {profileData.fees}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEdit ? (
                  <input
                    type="checkbox"
                    checked={profileData.available}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        available: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-indigo-500"
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={profileData.available}
                    disabled
                    className="w-5 h-5 text-indigo-500"
                  />
                )}
                <label
                  htmlFor="availability"
                  className="text-gray-700 font-semibold mr-8"
                >
                  Available for Appointments
                </label>
              </div>
            </div>
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-lg text-right">
            {isEdit ? (
              <Button
                onClick={updateProfile}
                className="rounded-xl bg-green-500 text-white hover:bg-green-600"
              >
                SAVE
              </Button>
            ) : (
              <Button
                onClick={() => setIsEdit(true)}
                className="rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
              >
                EDIT
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
