import { firestore } from "../config/firebase";
import { AppointmentWithId } from "../interfaces";

export const getAllAppointment = async (): Promise<AppointmentWithId[]> => {
  const snapshot = await firestore.collection("appointments").get();
  const appointments: AppointmentWithId[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AppointmentWithId[];
  return appointments;
};
