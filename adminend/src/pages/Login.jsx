import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { AdminContext } from "@/context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "@/context/DoctorContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loginType, setLoginType] = useState("Admin");
  const [password, setPassword] = useState("");
  const { setDoctorToken } = useContext(DoctorContext);
  const { setAdminToken, backEndUrl } = useContext(AdminContext);

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (loginType === "Admin") {
        const { data } = await axios.post(`${backEndUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("AdminToken", data.token);
          setAdminToken(data.token);
          toast.success("Login successfull!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backEndUrl}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("Token", data.token);
          setDoctorToken(data.token);
          toast.success("Login successfull!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md rounded-lg bg-white p-6 sm:p-8 lg:p-10"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3 flex items-center justify-center">
          <p className="text-indigo-500 mr-2">{loginType}</p> Login
          <div className="ml-2">
            <Stethoscope className="text-indigo-600 w-10 h-8 flex items-center justify-center" />
          </div>
        </h2>

        <p className="mb-4 text-sm text-center text-gray-500">
          Login as {loginType.toLowerCase()} to access the platform.
        </p>

        <div className="mb-4 flex justify-center space-x-4">
          <Button
            type="button"
            onClick={() => handleLoginTypeChange("Admin")}
            className={`${
              loginType === "Admin"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } px-4 py-2 rounded-2xl transition duration-200 ease-in-out transform ${
              loginType === "Admin"
                ? "shadow-lg"
                : "hover:bg-gray-300 hover:shadow-md"
            }`}
          >
            Admin
          </Button>
          <Button
            type="button"
            onClick={() => handleLoginTypeChange("Doctor")}
            className={`${
              loginType === "Doctor"
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } px-4 py-2 rounded-2xl transition duration-200 ease-in-out transform ${
              loginType === "Doctor"
                ? "shadow-lg"
                : "hover:bg-gray-300 hover:shadow-md"
            }`}
          >
            Doctor
          </Button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-gray-700 text-sm sm:text-base"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-gray-700 text-sm sm:text-base"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <Button
          type="submit"
          className="mt-3 w-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-200 rounded-lg shadow-md py-2"
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default Login;
