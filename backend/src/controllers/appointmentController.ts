import { Request, Response } from "express";
import { getAllAppointment } from "../services/appointmentServices";
import { getUserById } from "../services/userServices";

// Membaca semua informasi Appointment yang ada
export const getAllAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const appointments = await getAllAppointment();
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
