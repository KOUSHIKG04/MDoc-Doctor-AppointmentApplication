import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("SIGN UP");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { backEndUrl, userToken, setUserToken } = useContext(AppContext);

  const toggleState = () => {
    setCurrentState((prev) => (prev === "SIGN UP" ? "LOGIN" : "SIGN UP"));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (currentState === "SIGN UP") {
        const { data } = await axios.post(`${backEndUrl}/api/user/signup`, {
          name: userName,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("Token", data.token);
          setUserToken(data.token);
          toast.success("Sign up successful");
          setCurrentState("LOGIN");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backEndUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("Token", data.token);
          setUserToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md rounded-lg bg-white p-6 sm:p-8 lg:p-10  "
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3 flex items-center justify-center">
          {currentState}
          <div className="ml-2">
            <Stethoscope className="text-indigo-600 w-10 h-8 flex items-center justify-center" />
          </div>
        </h2>

        <p className="mb-4 text-sm text-center text-gray-500">
          {currentState === "SIGN UP"
            ? "Create Account To Get Started"
            : "Login In To Book Appointment"}
        </p>

        {currentState === "SIGN UP" && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-gray-700 text-sm sm:text-base"
            >
              User Name
            </label>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              id="username"
              name="username"
              placeholder="Enter your username"
              className="border-gray-300 focus:ring focus:ring-blue-200 rounded-lg w-full"
              required
            />
          </div>
        )}

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

        {/* {currentState === "SIGN UP" && (
        <div className="text-center font-medium mb-4">
          <div className="flex items-center justify-center space-x-2">
            <Checkbox id="terms1" className="rounded-full" />
            <div className="text-left">
              <Label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Agree to the terms and conditions
              </Label>
            </div>
          </div>
        </div>
         )}  */}

        <Button
          type="submit"
          className="mt-3 w-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-200 rounded-lg shadow-md py-2"
        >
          {currentState === "SIGN UP" ? "SIGN UP" : "LOGIN"}
        </Button>

        <div className="text-center font-medium mt-4">
          {currentState === "SIGN UP" ? (
            <p className="text-sm sm:text-base">
              Already have an account?
              <span
                className="text-blue-500 cursor-pointer underline pl-1"
                onClick={toggleState}
              >
                LOGIN HERE
              </span>
            </p>
          ) : (
            <p className="text-sm sm:text-base">
              Don't have an account?
              <span
                className="text-blue-500 cursor-pointer underline pl-2"
                onClick={toggleState}
              >
                SIGN UP HERE
              </span>
            </p>
          )}
          {/* {currentState === "LOGIN" && (
            <p className="text-[2px] sm:text-base mt-2">
              Forgot Password
              <span
                className="text-blue-500 cursor-pointer underline pl-2"
                onClick={() => resetPassword(email, toast)}
              >
                RESET HERE
              </span>
            </p>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default Login;
