import { ref } from "vue";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut} from "firebase/auth";

import  {firebaseAuth}  from "./useFirebase"
import { doc, setDoc} from "firebase/firestore"
import { db } from '@/firebase/invoiceFire';

const isAuthenticated = ref(false);

const user = ref("");


const useAuth =  () => {
  const login = async (username, password) => {
    const res = await signInWithEmailAndPassword(
      firebaseAuth, 
      username,
       password
       );

       if(res.user) {
         isAuthenticated.value = true;
         user.value = res.user.uid;
         
       }

  };
  const signup = (username, password) => {
    const res =  createUserWithEmailAndPassword(
      firebaseAuth, 
      username,
       password
       ).then((cred)=> {
        const docRef = doc(db,"users",cred.user.uid);
        setDoc(docRef,{"email":cred.user.email,"id":cred.user.uid});
       })

       if(res.user) {
         isAuthenticated.value = true;
         user.value = res.user.email;
       }
  };

  const logout = async() => {
    await signOut(firebaseAuth);
    isAuthenticated.value = false;
    user.value = "";
  };

  return { isAuthenticated, login, signup, logout, user };
};

export default useAuth;
