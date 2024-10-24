import express from "express";
import {
  doctorList,
  doctorLogin,
  appoinmentsDoctors,
  appointmentCancel,
  appointmentComplete,
  doctorDashbaord,
  UpdateDoctorProfile,
  doctorProfile
} from "../controllers/doctorsCotroller.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, appoinmentsDoctors);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashbaord);
doctorRouter.post("/update-profile", authDoctor, UpdateDoctorProfile);
doctorRouter.get("/profile", authDoctor, doctorProfile);

export default doctorRouter;
