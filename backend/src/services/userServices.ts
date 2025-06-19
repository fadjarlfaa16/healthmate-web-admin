import { auth, firestore } from "../config/firebase";
import { UserWithId } from "../interfaces";

function serializeTimestamp(raw: any): number {
  // Firestore Timestamp (admin SDK)
  if (raw?.toMillis && typeof raw.toMillis === "function") {
    return raw.toMillis();
  }
  // Native JS Date
  if (raw instanceof Date) {
    return raw.getTime();
  }
  // ISO string
  if (typeof raw === "string") {
    const ms = Date.parse(raw);
    return isNaN(ms) ? 0 : ms;
  }
  // fallback
  return 0;
}

export const getAllUsers = async (): Promise<UserWithId[]> => {
  const snap = await firestore.collection("users").get();
  return snap.docs.map((doc) => {
    const data = doc.data() as any;
    return {
      id: doc.id,
      email: data.email,
      password: data.password,
      accountCreated: serializeTimestamp(data.accountCreated),
      profile: {
        fullname: data.profile?.fullname ?? "",
        domicle: data.profile?.domicle ?? "",
        age: data.profile?.age ?? 0,
        imagePath: data.profile?.imagePath ?? "",
      },
    };
  });
};

export const getUserById = async (uid: string): Promise<UserWithId | null> => {
  const doc = await firestore.collection("users").doc(uid).get();
  if (!doc.exists) return null;
  const data = doc.data() as any;
  return {
    id: uid,
    email: data.email,
    password: data.password,
    accountCreated: serializeTimestamp(data.accountCreated),
    profile: {
      fullname: data.profile?.fullname ?? "",
      domicle: data.profile?.domicle ?? "",
      age: data.profile?.age ?? 0,
      imagePath: data.profile?.imagePath ?? "",
    },
  };
};

export const deleteUser = async (uid: string): Promise<void> => {
  await auth.deleteUser(uid);
  await firestore.collection("users").doc(uid).delete();
};
