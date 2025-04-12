// src/services/firebaseServices.ts
import { firestore } from "../config/firebase";
import {
  Doctor,
  UserWithId,
  DoctorWithId,
  AppointmentWithId,
  User,
} from "../interfaces";

// USER SECTION

// Get All Users (Admin SDK pakai .get() + .data())
export const getAllUsers = async (): Promise<UserWithId[]> => {
  const snapshot = await firestore.collection("users").get();
  const users: UserWithId[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserWithId[];
  return users;
};

export const getUserById = async (id: string): Promise<UserWithId | null> => {
  const doc = await firestore.collection("users").doc(id).get();
  return doc.exists ? { id: doc.id, ...(doc.data() as User) } : null;
};

// DOCTOR SECTION


// APPOINTMENT SECTION

