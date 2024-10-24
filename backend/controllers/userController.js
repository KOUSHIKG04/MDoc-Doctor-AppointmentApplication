import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";

export const UserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(422)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(422).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedUserPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedUserPassword,
    };

    const newUser = new User(userData);
    const users = await newUser.save();

    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ success: true, token, message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ success: false, message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.status(422).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, {
        image: imageURL,
      });
    }

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime } = req.body;

    if (!userId || !doctorId || !slotDate || !slotTime) {
      return res.status(422).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const doctorData = await Doctor.findById(doctorId).select("-password");
    if (!doctorData.available) {
      return res
        .status(422)
        .json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = doctorData.slots_booked || [];

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(422)
          .json({ success: false, message: "Slot already booked" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select("-password");
    delete doctorData.slots_booked;

    const appointmentData = {
      userId,
      doctorId,
      slotDate,
      slotTime,
      userData,
      doctorData,
      amount: doctorData.fees,
      date: Date.now(),
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    await Doctor.findByIdAndUpdate(doctorId, {
      slots_booked,
    });

    res.status(200).json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentsList = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await Appointment.find({ userId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    await Appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(doctorId).select("-password");

    let slots_booked = doctorData.slots_booked || [];
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await Doctor.findByIdAndUpdate(doctorId, {
      slots_booked,
    });

    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

    const razorpayOrder = await razorpayInstance.orders.create(options);
    console.log(razorpayOrder);

    res.status(200).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == "paid") {
      await Appointment.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
