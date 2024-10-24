import { MailPlus, PhoneForwarded, Stethoscope } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white text-gray-600 py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        <div className="flex flex-col items-center md:items-start space-y-2 mb-4 md:mb-0">
          <div
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Stethoscope className="text-indigo-600 w-6 h-6" />
            <p className="text-lg font-semibold">MDoc</p>
          </div>
          <p className="text-sm">Your trusted healthcare platform</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
          <p className="text-sm flex items-center">
            <PhoneForwarded className="w-4 h-4 mr-2" />
            <a href="tel:+1234567890" className="hover:underline">
              +1 234 567 890
            </a>
          </p>
          <p className="text-sm flex items-center">
            <MailPlus className="w-4 h-4 mr-2" />
            <a href="mailto:contact@mdoc.com" className="hover:underline">
              contact@mdoc.com
            </a>
          </p>
        </div>

        <div className="text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} MDoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
