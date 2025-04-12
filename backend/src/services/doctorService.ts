import { firestore } from "../config/firebase";
import { Doctor, DoctorWithId } from "../interfaces";

// Mengambil Semua data Doctor
export const getAllDoctors = async (): Promise<DoctorWithId[]> => {
  const snapshot = await firestore.collection("doctors").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as DoctorWithId[];
};

// Create data Doctor
export const createDoctor = async (doctor: Doctor): Promise<DoctorWithId> => {
  const docRef = await firestore.collection("doctors").add(doctor);
  return { id: docRef.id, ...doctor };
};

// Update data Doctor dari id
export const updateDoctor = async (
  id: string,
  doctor: Partial<Doctor>
): Promise<void> => {
  await firestore.collection("doctors").doc(id).update(doctor);
};

// Delete data Doctor dari id
export const deleteDoctor = async (id: string): Promise<void> => {
  await firestore.collection("doctors").doc(id).delete();
};

// Mendapatkan data Doctor dari id
export const getDoctorById = async (
  id: string
): Promise<DoctorWithId | null> => {
  const doc = await firestore.collection("doctors").doc(id).get();
  return doc.exists ? { id: doc.id, ...(doc.data() as Doctor) } : null;
};
