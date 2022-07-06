<template>
  <div class="surface-section px-3 py-4 md:px-6 lg:px-8">
      <h5 class="font-bold text-blue-800 text-2xl">Create New Customer</h5>
    <div class="flex-center">
        <form class="p-fluid" @submit.prevent="createCustomer">
          <div class="field">
            <div class="p-float-label">First Name
              <InputText id="firstname" v-model="customerInfo.firstname" type="text" class="text-primary-800"/>
            </div>
          </div>
           <div class="field">
            <div class="p-float-label">Middle Name
              <InputText id="middlename" v-model="customerInfo.middlename" type="text" class="text-primary-800" />
            </div>
          </div>
           <div class="field">
            <div class="p-float-label">Last Name
              <InputText id="lastname" v-model="customerInfo.lastname" type="text" class="text-primary-800"/>
            </div>
          </div>
           <div class="field">
            <div class="p-float-label">Resident Address
              <InputText id="address" v-model="customerInfo.address" type="text" class="text-primary-800"/>
            </div>
          </div>
           <div class="field">
            <div class="p-float-label">Country
              <InputText id="country" v-model="customerInfo.country" type="text" class="text-primary-800" />
            </div>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">Phone Number
              <InputText id="contact" v-model="customerInfo.contact" type="number" class="text-primary-800" />
            </div>
          </div>
           <div class="field">
            <div class="p-float-label">Email
              <InputText id="email" v-model="customerInfo.email" type="email" class="text-primary-800"/>
            </div>
          </div>

          <Button type="submit" label="Create Customer" class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap w-full  bg-primary-800" />
        </form>
      </div>
    </div>
</template>
<script>
//import customerColRef from '../../firebase/firebase'
import { doc, setDoc, serverTimestamp, getDoc} from 'firebase/firestore'
import { db } from '@/firebase/invoiceFire';
import userColRef from "@/firebase/usersFire";
import useAuth from "../../firebase/auth/useAuth";

export default {
  data() {
    return {
      userId: null,
      userName: null,
      docRef: null,
      id:null,
      customerInfo: {
    firstname: null,
    middlename: null,
    lastname: null,
    address: null,
    email: null,
    country: null,
    contact: null,
    createdAt: serverTimestamp()
      }
  }
  },
  methods: {
    async getUser() {
      const userRef = doc(userColRef,this.userId);
      this.docRef = userRef;
      const userr = await getDoc(this.docRef)
      const userData = userr.data();
      this.userName = userData.name;
      console.log(userData);

    },
    async createCustomer() {
      console.log('creating Document');
      var id=makeid(32);

      this.id=id;
      //var collection=CollectionReference("customers");
      //collection.setDoc(id,thicollection, s.$data)
      const docRef=doc(db,"customers",this.id);
      await setDoc(docRef,this.$data);
      this.$router.push("/clients");
    }
  },
  created(){
    const userId = useAuth();
   const {  user } = userId;
    this.userId = user;
    this.getUser()
  }
};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

</script>
