import admin from "firebase-admin";
import * as serviceAccount from "./secret.json";

export const init = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

export default admin;
