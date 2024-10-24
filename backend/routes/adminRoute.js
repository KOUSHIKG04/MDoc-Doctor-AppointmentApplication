import express from "express";
import {
  addDoctor,
  loginAdmin,
  getDoctors,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  adminDashboard
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorsCotroller.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, getDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointmentAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
