import { ChevronDown, CircleX, Stethoscope } from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assets } from "@/assets/assets_frontend/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { AppContext } from "@/Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userToken, setUserToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setUserToken(false);
    localStorage.removeItem("Token");
  };

  return (
    <nav
      className="w-full flex items-center justify-between py-4 px-6 
    bg-white  border-gray-200"
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <Stethoscope className="text-indigo-600 w-6 h-6 mt-1" />
        <NavLink to="/" className="text-xl font-semibold text-gray-800 ">
          MDoc
        </NavLink>
      </div>

      <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
          }
        >
          <li className="hover:text-indigo-600 transition-colors duration-200">
            Home
          </li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
          }
        >
          <li className="hover:text-indigo-600 transition-colors duration-200">
            Doctor's
          </li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
          }
        >
          <li className="hover:text-indigo-600 transition-colors duration-200">
            About
          </li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
          }
        >
          <li className="hover:text-indigo-600 transition-colors duration-200">
            Contact
          </li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-2">
        {userToken && userData ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none focus:outline-none">
                <Avatar className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-600 cursor-pointer">
                  <AvatarImage src={userData?.image} />
                  <AvatarFallback className="bg-gray-300 text-white font-medium">
                    CN
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="absolute right-0 md:right-auto lg:left-[-40px] bg-white border border-gray-200 shadow-lg rounded-md py-2 mt-2 w-48 
                text-sm font-medium text-gray-700"
              >
                <DropdownMenuItem
                  className="px-3 cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-md"
                  onClick={() => navigate("my-profile")}
                >
                  MY PROFILE
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="px-3 text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate("my-appointments")}
                >
                  MY APPOINTMENTS
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="px-3  text-gray-500 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  LOGOUT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            className=" text-white bg-indigo-500 rounded-2xl
        hover:bg-indigo-600 hover:text-white hidden md:block"
            onClick={() => navigate("/login")}
          >
            SIGNUP
          </Button>
        )}
        <Menu className="w-6 h-6 md:hidden" onClick={() => setShowMenu(true)} />

        <div
          className={`${
            showMenu ? "fixed w-full " : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Stethoscope className="text-indigo-600 w-6 h-6 mt-1" />
              <NavLink to="/" className="text-xl font-semibold text-gray-800 ">
                MDoc
              </NavLink>
            </div>

            <CircleX
              className="text-gray-600 w-6 h-6 mt-1"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="mt-5 flex flex-col items-center space-y-6 text-gray-700 font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              }
            >
              <li className="hover:text-indigo-600 transition-colors duration-200">
                Home
              </li>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              }
            >
              <li className="hover:text-indigo-600 transition-colors duration-200">
                Doctor's
              </li>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              }
            >
              <li className="hover:text-indigo-600 transition-colors duration-200">
                About
              </li>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""
              }
            >
              <li className="hover:text-indigo-600 transition-colors duration-200">
                Contact
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
