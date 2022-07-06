<template>
    <div class="surface-section px-3 py-4 md:px-6 lg:px-8">
      <h4 class="font-bold text-blue-800 text-2xl">Create Invoice</h4>
      <form @submit.prevent="createInvoice">
        <div class="p-fluid grid">
          <div class="field col-12 md:col-4">
            Customer Name
            <span class="p-float-label">
              <InputText id="inputtext" type="text" v-model="invoiceInfo.customername" class="text-primary-800"/>
            </span>
          </div>
         
          <div class="field col-12 md:col-4">
            Project Name
            <span class="p-float-label">
             
              <InputText
                id="inputtext"
                type="text"
                v-model="invoiceInfo.projectname"
                class="text-primary-800"
              />
           
            </span>
            
          </div>
         
          <div class="field col-6 md:col-4">
            Unit Price
            <span class="p-float-label">
              
              <InputNumber
                id="inputtext-right"
                type="text"
                v-model="invoiceInfo.unitprice"
                class="text-primary-800"
              />
               
            </span>
          </div>

          <div class="field col-6 md:col-4">
            Area (SQM)
            <span class="p-float-label">
                
              <InputNumber
                id="inputmask"
                v-model="invoiceInfo.area"
                class="text-primary-800"
              />
              
            </span>
          </div>

          <!-- <div class="field col-6 md:col-4">
            Downpayment %
            <span class="p-float-label">
            
              <InputNumber id="calendar" v-model="invoiceInfo.downpayment" class="text-primary-800" />
            
            </span>
          </div> -->
          <div class="field col-12 md:col-4">
            Duration
            <span class="p-float-label">
              
              <InputNumber id="inputnumber" v-model="invoiceInfo.duration" class="text-primary-800"/>
              
            </span>
          </div>
          <div class="field col-12 md:col-4">
            Due Date       
              <span class="p-float-label">

                <Calendar id="dateFormat" type="text" v-model="invoiceInfo.duedate" dateFormat="dd-mm-yy" class="text-primary-800" />
  
              </span>
          </div>
          <div class="field col-12 md:col-4">
            Note
            <span class="p-float-label">
              <Textarea
                id="cascadeSelect"
                v-model="invoiceInfo.note"
                :options="cascadeCountries"
                optionLabel="cname"
                optionGroupLabel="name"
                class="text-primary-800"
              />
  
            </span>
          </div>
      <div class="col-12 flex align-items-center text-700 flex-wrap text-white bg-primary-800 border-primary-800 mb-2 p-3 w-full mt-auto">
        <div class="flex">
          <span class="font-bold ml-2">Total amount: <h6>{{formatPrice(invoiceInfo.area * invoiceInfo.unitprice)}}</h6></span>
        
          <span class="font-bold ml-2">Downpayment: <h6>{{formatPrice((invoiceInfo.area * invoiceInfo.unitprice) /invoiceInfo.duration)}}</h6></span>
       
          <span class="font-bold ml-2">Monthly Payment: <h6>{{formatPrice(((invoiceInfo.area * invoiceInfo.unitprice)-((invoiceInfo.area * invoiceInfo.unitprice) /invoiceInfo.duration)) / (invoiceInfo.duration - 1))}} </h6> </span>
        </div>
      </div>
        </div>
        <Button type="submit" label=" Create Invoice" class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap w-full  bg-primary-800" />
      </form>
    </div>
</template>
<script>

// import { db } from "../../firebase/invoiceFire"
import {serverTimestamp,setDoc, doc, getDoc} from 'firebase/firestore'
import { db } from '@/firebase/invoiceFire';
import customerColRef from '@/firebase/firebase'

export default {
  data() {
    return {
      customerId: null,
      docRef: null,
      id: null,
      userId: null,
      userName: null,
      lastname:null,
      middlename: null,
      address: null,
      email: null,
      contact: null,
      country: null,
      invoiceInfo: {
    customername: null,
    projectname: null,
    area: null,
    duedate: null,
    note: null,
    unitprice: null,
    downpayment: null,
    duration: null,
    createdAt: serverTimestamp(),
    status: "Pending",
      }
  }
  },
  methods: {
    async getCustomer() {
      const custometRef = doc(customerColRef, this.customerId);
      this.docRef = custometRef;
      const cust = await getDoc(this.docRef)
      const custData = cust.data();
      this.invoiceInfo.customername = custData.customerInfo.firstname;
      this.lastname = custData.customerInfo.lastname;
      this.middlename = custData.customerInfo.middlename;
      this.email = custData.customerInfo.email;
      this.contact = custData.customerInfo.contact;
      this.country = custData.customerInfo.country;
      this.address = custData.customerInfo.address;
      this.userId = custData.userId;
      this.userName = custData.userName;
    },
   
    async createInvoice() {
         console.log('creating Document');
         var id=makeid(32);
         this.id=id;
       
        const docRef = doc(db,"invoices", this.id)
         await setDoc(docRef,this.$data);
  
      // alert('Invoice created succesfully');
      this.$router.push("/billings");

    },
      formatPrice(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "TZS",
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  }, created(){
    const customerId = this.$route.params.customerId;
    this.customerId = customerId
    this.getCustomer()
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