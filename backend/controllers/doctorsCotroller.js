import Doctor from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";

export const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const docData = await Doctor.findById(doctorId);
    await Doctor.findByIdAndUpdate(doctorId, {
      available: !docData.available,
    });

    res.status(200).json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-email", "-password"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: doctor._id,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        success: true,
        token,
        message: "Doctor logged in successfully",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appoinmentsDoctors = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await Appointment.find({ doctorId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId, doctorId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && doctorId === appointmentData.doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment done" });
    } else {
      return res.status(400).json({ success: false, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId, doctorId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && doctorId === appointmentData.doctorId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res
        .status(200)
        .json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.status(400).json({ success: false, message: "cancel Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorDashbaord = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await Appointment.find({ doctorId });

    let earnings = 0;
    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        earnings += appointment.amount;
      }
    });

    let patients = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctorData = await Doctor.findById(doctorId).select("-password");

    res.status(200).json({ success: true, doctorData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const UpdateDoctorProfile = async (req, res) => {
  try {
    const { doctorId, fees, address, available, about } = req.body;

    await Doctor.findByIdAndUpdate(doctorId, {
      fees,
      address,
      available,
      about,
    });

    res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
