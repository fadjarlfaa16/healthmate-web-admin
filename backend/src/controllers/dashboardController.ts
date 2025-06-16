import { Request, Response } from "express";
import { firestore } from "../config/firebase";

export const getDashboardStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const [userSnap, doctorSnap, appointmentSnap] = await Promise.all([
      firestore.collection("users").get(),
      firestore.collection("doctors").get(),
      firestore.collection("appointments").get(),
    ]);

    const stats = {
      totalUsers: userSnap.size,
      totalDoctors: doctorSnap.size,
      totalAppointments: appointmentSnap.size,
    };

    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
