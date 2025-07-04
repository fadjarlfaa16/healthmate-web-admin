import admin from "firebase-admin";
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// For Firestore
const firestore = admin.firestore();

export { admin, firestore };
export const auth = admin.auth();
