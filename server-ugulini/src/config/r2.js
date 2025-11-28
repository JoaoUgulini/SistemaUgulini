import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "SEU_BUCKET.appspot.com"
});

const bucket = admin.storage().bucket();
export default bucket;
