import { assets } from "@/assets/assets_admin/assets";
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { AdminContext } from "@/context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const AddDoctors = () => {
  const [docImg, setDocImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "General physician",
    degree: "",
    experience: "1",
    fees: "",
    address1: "",
    address2: "",
    about: "",
  });

  const { AdminToken, backEndUrl } = useContext(AdminContext);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Doctor picture is required");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("experience", doctorData.experience);
      formData.append("speciality", doctorData.speciality);
      formData.append("name", doctorData.name);
      formData.append("password", doctorData.password);
      formData.append("email", doctorData.email);
      formData.append("degree", doctorData.degree);
      formData.append("fees", Number(doctorData.fees));
      formData.append(
        "address",
        JSON.stringify({
          line1: doctorData.address1,
          line2: doctorData.address2,
        })
      );
      formData.append("about", doctorData.about);

      const { data } = await axios.post(
        `${backEndUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setDoctorData({
          name: "",
          email: "",
          password: "",
          speciality: "General physician",
          degree: "",
          experience: "1",
          fees: "",
          address1: "",
          address2: "",
          about: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-4xl mx-16 max-h-[80vh] overflow-y-scroll ">
      {loading && (
        <div className="mx-auto flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-[950px] rounded-xl bg-gray-400" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[950px] bg-gray-400" />
            <Skeleton className="h-6 w-[900px] bg-gray-400" />
          </div>
        </div>
      )}
 
      <div className=" shadow-lg rounded-xl p-12 space-y-2">
        <form
          onSubmit={handleSubmit}
          className={`space-y-12 ${loading ? "hidden" : ""}`}
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-24 h-24 rounded-full border bg-gray-100 flex 
              items-center justify-center overflow-hidden"
            >
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <Label
              htmlFor="doc-img"
              className="text-gray-600 text-sm cursor-pointer hover:text-gray-900"
            >
              Upload doctor picture
            </Label>
            <input
              type="file"
              id="doc-img"
              hidden
              accept="image/*"
              onChange={(e) => setDocImg(e.target.files[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <Label
                htmlFor="name"
                className="block mb-2 text-gray-700 font-medium"
              >
                Doctor Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={doctorData.name}
                onChange={handleChange}
                placeholder="Doctor name"
                className="border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="speciality"
                className="block mb-2 text-gray-700 font-medium"
              >
                Speciality
              </Label>
              <select
                id="speciality"
                name="speciality"
                value={doctorData.speciality}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="General physician">General physician</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Gynecologist">Gynecologist</option>
              </select>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block mb-2 text-gray-700 font-medium"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={doctorData.email}
                onChange={handleChange}
                placeholder="Doctor email"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="degree"
                className="block mb-2 text-gray-700 font-medium"
              >
                Education (Degree)
              </Label>
              <Input
                type="text"
                id="degree"
                name="degree"
                value={doctorData.degree}
                onChange={handleChange}
                placeholder="Doctor's education"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block mb-2 text-gray-700 font-medium"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={doctorData.password}
                onChange={handleChange}
                placeholder="Doctor password"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="experience"
                className="block mb-2 text-gray-700 font-medium"
              >
                Year of Experience
              </Label>
              <select
                id="experience"
                name="experience"
                value={doctorData.experience}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select experience</option>
                <option value="5+ years">5+ </option>
                <option value="4 years">4 </option>
                <option value="3 years">3 </option>
                <option value="2 years">2 </option>
                <option value="1 years">1 </option>
              </select>
            </div>

            <div>
              <Label
                htmlFor="address1"
                className="block mb-2 text-gray-700 font-medium"
              >
                Address 1
              </Label>
              <Input
                type="text"
                id="address1"
                name="address1"
                value={doctorData.address1}
                onChange={handleChange}
                placeholder="Address line 1"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label
                htmlFor="address2"
                className="block mb-2 text-gray-700 font-medium"
              >
                Address 2
              </Label>
              <Input
                type="text"
                id="address2"
                name="address2"
                value={doctorData.address2}
                onChange={handleChange}
                placeholder="Address line 2"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label
                htmlFor="fees"
                className="block mb-2 text-gray-700 font-medium"
              >
                Fees
              </Label>
              <Input
                type="number"
                id="fees"
                name="fees"
                value={doctorData.fees}
                onChange={handleChange}
                placeholder="Fees in $"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="col-span-2">
              <Label
                htmlFor="about"
                className="block mb-2 text-gray-700 font-medium"
              >
                About Doctor
              </Label>
              <textarea
                id="about"
                name="about"
                value={doctorData.about}
                onChange={handleChange}
                placeholder="Write about doctor"
                className="border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-indigo-600 text-white w-full py-3 rounded-xl transition duration-200 ease-in-out hover:bg-indigo-700"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctors;
