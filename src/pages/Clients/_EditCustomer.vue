<template>
  <div class="surface-section px-3 py-4 md:px-6 lg:px-8">
    <h5 class="font-bold text-blue-800 text-2xl">Update Customer</h5>
    <div class="flex-center">
        <form class="p-fluid" @submit.prevent="updateCustomer">
          <div class="field">
            <div class="p-float-label">First Name
              <InputText id="name" v-model="customerInfo.firstname" class="text-primary-800" />
              <label></label>
            </div>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">Middle Name
              <InputText id="contact" v-model="customerInfo.middlename" class="text-primary-800"/>
              <label></label>
            </div>
          </div>
            <div class="field">
            <div class="p-float-label p-input-icon-right">Last Name
              <InputText id="contact" v-model="customerInfo.lastname" class="text-primary-800"/>
              <label></label>
            </div>
          </div>
            <div class="field">
            <div class="p-float-label p-input-icon-right">Contact
              <InputText id="contact" v-model="customerInfo.contact" class="text-primary-800"/>
              <label></label>
            </div>
          </div>
            <div class="field">
            <div class="p-float-label p-input-icon-right">Resident Address
              <InputText id="contact" v-model="customerInfo.address" class="text-primary-800"/>
              <label></label>
            </div>
          </div>
            <div class="field">
            <div class="p-float-label p-input-icon-right">Email
              <InputText id="contact" v-model="customerInfo.email" class="text-primary-800"/>
              <label></label>
            </div>
          </div>
            <div class="field">
            <div class="p-float-label p-input-icon-right">Country
              <InputText id="contact" v-model="customerInfo.country" class="text-primary-800"/>
              <label></label>
            </div>
          </div>

          <Button type="submit" label="Update Customer" class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap w-full  bg-primary-800" />
        </form>
      </div>
    </div>
</template>
<script>
import customersColRef from '../../firebase/firebase'
import  {getDoc, doc,setDoc } from 'firebase/firestore' 

export default {
  data(){
    return {
      // selectedCustomer: {},
      userId: null,
      userName: null,
      customerId: null,
      id: null,
      docRef: null,
      customerInfo: {
         firstname: null,
         middlename: null,
         lastname: null,
         address: null,
         country: null,
         email: null,
         contact: null,
         createdAt: null
      }
     
    }
  },
  methods: {
   async getCustomer(){
      const customerRef = doc(customersColRef, this.customerId);
      this.docRef = customerRef;
      const customer = await getDoc(this.docRef)
      // console.log(customer.data())
      const customerData = customer.data();
      this.customerInfo.firstname = customerData.customerInfo.firstname;
      this.customerInfo.middlename = customerData.customerInfo.middlename;
      this.customerInfo.lastname = customerData.customerInfo.lastname;
      this.customerInfo.address = customerData.customerInfo.address;
      this.customerInfo.country = customerData.customerInfo.country;
      this.customerInfo.email = customerData.customerInfo.email;
      this.customerInfo.contact = customerData.customerInfo.contact;
      this.customerInfo.createdAt = customerData.customerInfo.createdAt;
      this.userId = customerData.userId;
      this.userName = customerData.userName;
      this.id = customerData.id;
    }, 
    async updateCustomer(){
      await setDoc(this.docRef, this.$data);
      // alert(`The customer with The Id ${this.customerId} has been updated successfully`);
      this.$router.push("/clients")

    }

  },
  created(){
    const customerId = this.$route.params.customerId;
    this.customerId = customerId;
    this.getCustomer()
  }

}
</script>