// src/services/firebaseServices.ts
import { firestore } from "../config/firebase";
import {
  Doctor,
  UserWithId,
  DoctorWithId,
  AppointmentWithId,
  User,
} from "../interfaces";

export const getAllUsers = async (): Promise<UserWithId[]> => {
  const snapshot = await firestore.collection("users").get();

  const users: UserWithId[] = snapshot.docs.map((doc) => {
    const data = doc.data() as User;

    return {
      id: doc.id,
      email: data.email,
      password: data.password,
      accountCreated: data.accountCreated,
      profile: {
        fullname: data.profile?.fullname ?? "",
        domicle: data.profile?.domicle ?? "",
        age: data.profile?.age ?? 0,
        imagePath: data.profile?.imagePath ?? "", // ⬅️ tambahin ini!
      },
    };
  });

  return users;
};

export const getUserById = async (id: string): Promise<UserWithId | null> => {
  const doc = await firestore.collection("users").doc(id).get();
  return doc.exists ? { id: doc.id, ...(doc.data() as User) } : null;
};
