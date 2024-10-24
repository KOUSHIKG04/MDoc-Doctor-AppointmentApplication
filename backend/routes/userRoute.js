import express from "express";
import {
  UserSignup,
  UserLogin,
  getUsers,
  updateUser,
  bookAppointment,
  appointmentsList,
  cancelAppointment,
  razorpayPayment,
  verifyPayment
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/signup", UserSignup);
userRouter.post("/login", UserLogin);
userRouter.get("/get-profile", authUser, getUsers);
userRouter.post("/update-profile", upload.single("image"), authUser, updateUser);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, appointmentsList);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/razorpay-payment", authUser, razorpayPayment);
userRouter.post("/verify-payment", authUser, verifyPayment);

export default userRouter;
