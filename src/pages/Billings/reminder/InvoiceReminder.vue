<template>
    <div class="surface-section px-3 py-4 md:px-6 lg:px-8">
      <h4 class="font-bold text-blue-800">Set Reminder</h4>
      <form @submit.prevent="createReminder">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-4">
             Note
            <span class="p-float-label">
              <Textarea id="inputtext" type="text" v-model="reminderInfo.note" class="text-primary-800" />
            </span>
          </div>
          <div class="field col-12 md:col-4">
            Reminder Date
            <div class="p-inputgroup">
              <span class="p-float-label">
                <Calendar id="dateFormat" type="text" v-model="reminderInfo.duedate" dateFormat="mm-dd-yy" class="text-primary-800" />
              </span>
            </div>
          </div>
        </div>
        <Button type="submit" label=" Set Reminder" class="p-button-rounded bg-primary-800" />
      </form>
    </div>
</template>
<script>
import { db } from '@/firebase/invoiceFire'
import {setDoc,doc, serverTimestamp, getDoc} from 'firebase/firestore'
import invoiceColRef from '@/firebase/fire'

export default {
  data() {
    return {
      invoiceId: null,
      docRef: null,
      id: null,
      firstname: null,
      userId: null,
      userName: null,
      middlename: null,
      lastname: null,
      projectname: null,
      contact: null,
      area:null,
      unitprice: null,
      reminderInfo: {
       note: null,
        duedate: null,
        createdAt: serverTimestamp()
      }
  }
  },
  methods: {
    async getInvoice(){
     const invoiceRef = doc(invoiceColRef, this.invoiceId);
      this.docRef = invoiceRef;
      const invoice = await getDoc(this.docRef)
      const invoData = invoice.data();
      console.log(invoData)
      this.firstname = invoData.invoiceInfo.customername;
      this.middlename = invoData.middlename;
      this.lastname = invoData.lastname;
      this.projectname = invoData.invoiceInfo.projectname;
      this.contact = invoData.contact;
      this.area = invoData.invoiceInfo.area;
      this.unitprice = invoData.invoiceInfo.unitprice;
      this.userId = invoData.userId;
      this.userName = invoData.userName;
    },
    async createReminder() {
         console.log('creating Document');
         var id=makeid(32);
         this.id=id;
        const docRef = doc(db,"reminders", this.id)
         await setDoc(docRef,this.$data);
      // alert('Invoice created succesfully');
      //console.log(addedDoc);
      this.$router.push("/dashboard");
    }
  },
   created(){
    const invoiceId = this.$route.params.invoiceId;
    this.invoiceId = invoiceId;
    this.getInvoice()
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