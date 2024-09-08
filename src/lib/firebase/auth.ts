import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import firebase_app from "./config";
const provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

export default async function signInWithGoogle  ()  {
  try {
    await signInWithPopup(auth, provider);
  
  } catch (error:any) {
    console.log("error:", error.message)
  }
}