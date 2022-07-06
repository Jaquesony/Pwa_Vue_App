import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDw_ls75IwBSacLWwn2swt9uwCBsha7uFs",
  authDomain: "sells-app-e538c.firebaseapp.com",
  projectId: "sells-app-e538c",
  storageBucket: "sells-app-e538c.appspot.com",
  messagingSenderId: "869048852385",
  appId: "1:869048852385:web:151e744fb85fb2c087b5e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();


