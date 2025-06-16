import { firestore } from "../config/firebase";
import { AppointmentWithId, User, Doctor } from "../interfaces";

export const getAllAppointment = async (): Promise<AppointmentWithId[]> => {
  const snapshot = await firestore.collection("appointments").get();

  const appointments: AppointmentWithId[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    let userName = "Unknown";
    let doctorName = "Unknown Doctor";
    let specialist = "Unknown Specialist";
    let based = "Unknown Location";

    // Ambil user
    if (data.userId) {
      const userDoc = await firestore
        .collection("users")
        .doc(data.userId)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data() as User;
        userName = userData.profile?.fullname || "Unnamed User";
      }
    }

    // Ambil doctor
    if (data.doctorId) {
      const doctorDoc = await firestore
        .collection("doctors")
        .doc(data.doctorId)
        .get();
      if (doctorDoc.exists) {
        const doctorData = doctorDoc.data() as Doctor;
        doctorName = doctorData.fullname || "Unnamed Doctor";
        specialist = doctorData.specialist || "Unknown Specialist";
        based = doctorData.based || "Unknown Location";
      }
    }

    appointments.push({
      id: doc.id,
      ...data,
      userName,
      doctorName,
      specialist,
      based,
    } as AppointmentWithId & {
      userName: string;
      doctorName: string;
      specialist: string;
      based: string;
    });
  }

  return appointments;
};
