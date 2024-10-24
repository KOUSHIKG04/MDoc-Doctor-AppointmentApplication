import { assets } from "@/assets/assets_frontend/assets";
import { Button } from "@/components/ui/button";
import React from "react";

const Contact = () => {
  return (
    <div>
      <div className="my-8 flex flex-col md:flex-row gap-12 rounded-xl">
        <img
          className="w-full md:max-w-[460px] mt-6 rounded-none sm:rounded-xl"
          src={assets.contact_image}
          alt="Doctor consultation"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 w-full text-sm text-gray-600 px-6 pb-6 mt-5">
          <div className="text-center text-gray-700">
            <h1 className="text-2xl font-semibold">Contact Us</h1>
            <p className="mt-1 text-gray-700">
              We're here to help you with your healthcare needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-lg font-semibold text-gray-600 mb-1">
              Get In Touch
            </p>
            <p className="text-gray-600 mb-2">
              Feel free to reach out to us at our office or via email. We’re
              always here to assist you!
            </p>

            <div className="text-gray-700 mt-1">
              <p>
                <strong>Office:</strong> 00000 Willms Station, Suite 000,
                Washington, USA
              </p>
              <p className="mt-1.5">
                <strong>Tel:</strong> (000) 000-0000
              </p>
              <p className="mt-1.5">
                <strong>Email:</strong> greatstackdev@gmail.com
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border  flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                Careers at Prescripto
              </h2>
              <p className="text-gray-600 mb-4">
                Learn more about our teams and current job openings. Join us and
                be a part of revolutionizing healthcare!
              </p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="px-4 py-2 bg-indigo-500 text-white rounded-3xl font-semibold hover:bg-indigo-600 transition"
              >
                Explore Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
