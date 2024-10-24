import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppContext } from "@/Context/AppContext";
import React, { useContext, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData, userToken, backEndUrl, loadUserData } =
    useContext(AppContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, image: reader.result }));
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async () => {
    if (!userData || !userToken) return;

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("address", JSON.stringify(userData.address));
    formData.append("gender", userData.gender);
    formData.append("dob", userData.dob);

    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[78vh]">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[78vh]">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-none sm:rounded-xl p-1 mt-16  ">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <img
            src={userData?.image || "path/to/default/image.jpg"}
            alt="Profile"
            className="w-full h-full object-cover border-2 bg-indigo-200 rounded-full"
          />
          {isEdit && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <label className="text-white text-xs bg-indigo-500 px-2 py-1 rounded-md">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex-grow">
          {isEdit ? (
            <Input
              type="text"
              className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full text-xl font-medium"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              value={userData?.name || ""}
            />
          ) : (
            <p className="text-2xl text-gray-800">{userData?.name || ""}</p>
          )}
        </div>

        <Button
          onClick={() => {
            if (isEdit) {
              updateProfile();
            }
            setIsEdit(!isEdit);
          }}
          className="bg-indigo-500 text-white px-4 py-2 rounded-2xl hover:bg-indigo-600 transition duration-300"
        >
          {isEdit ? "SAVE" : "EDIT"}
        </Button>
      </div>
      <hr className="my-6"/>

      <div >
        <h2 className="text-lg font-semibold text-indigo-500 underline decoration-1">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="space-y-2 mt-3.5">
            <div className="flex items-center space-x-2">
              <p className="text-gray-800">Email:</p>
              {isEdit ? (
                <Input
                  type="email"
                  className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  value={userData?.email || ""}
                />
              ) : (
                <p className="text-gray-600">{userData?.email || ""}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-gray-800">Phone Number:</p>
              {isEdit ? (
                <Input
                  type="text"
                  className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  value={userData?.phone || ""}
                />
              ) : (
                <p className="text-gray-600">{userData?.phone || ""}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-800 mt-">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData?.address?.line1 || ""}
                />
                <Input
                  type="text"
                  className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData?.address?.line2 || ""}
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {userData?.address?.line1 || ""}
                <br />
                {userData?.address?.line2 || ""}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-6"/>
      <div className="space-y-2 ">
        <h2 className="text-lg font-semibold text-indigo-500 underline decoration-1">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">Gender:</p>
            {isEdit ? (
              <Select
                value={userData?.gender || ""}
                onValueChange={(value) =>
                  setUserData((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-800">{userData?.gender || ""}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-gray-600">Date of Birth:</p>
            {isEdit ? (
              <Input
                type="date"
                className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData?.dob || ""}
              />
            ) : (
              <p className="text-gray-800">{userData?.dob || ""}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
