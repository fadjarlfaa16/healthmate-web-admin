import { Request, Response } from "express";
import {
  getAllAppointment,
  updateAppointment,
} from "../services/appointmentServices";
import { getUserById } from "../services/userServices";

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

export const updateAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (typeof status !== "string") {
      res.status(400).json({ message: "Field `status` harus string" });
      return;
    }
    await updateAppointment(id, status);
    res.status(200).json({ message: `Status diubah jadi "${status}"` });
  } catch (err: any) {
    if (err.message === "Appointment not found") {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};
