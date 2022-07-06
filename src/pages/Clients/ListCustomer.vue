<template>
  <div>
    <div class="font-medium text-2xl text-900 font-bold text-blue-800 mb-2">
      List of Customers
    </div>
    <ScrollPanel style="width: 100%; height: 600px" class="custombar1">
      <ul class="list-none p-0 m-0"
      v-for="customer in customers"
          :key="customer.id">
        <li
          class="card"
          
        >
          <div>
            <router-link :to="{ path: `/billings/${customer.id}` }">
              <span class="block mb-1 text-blue-800 font-semibold text-lg"
                >{{ customer.customerInfo.firstname }}
                {{ customer.customerInfo.middlename }}
                {{ customer.customerInfo.lastname }}
                </span
              >
              <hr />
              <li class="flex align-items-center mb-2 mt-3">
                <span style="width: 10px; height: 10px"></span
                ><span class="text-base font-medium text-90">Phone Number:</span
                ><span class="text-600 text-base font-medium ml-auto">{{
                  customer.customerInfo.contact
                }}</span>
              </li>
              <li class="flex align-items-center mb-2 mt-3">
                <span style="width: 10px; height: 10px"></span
                ><span class="text-base font-medium">Email:</span
                ><span class="text-600 text-base font-medium ml-auto">{{
                  customer.customerInfo.email
                }}</span>
              </li>
              <li class="flex align-items-center mb-2 mt-3">
                <span style="width: 10px; height: 10px"></span
                ><span class="text-base font-medium">Address:</span
                ><span class="text-600 text-base font-medium ml-auto">{{
                  customer.customerInfo.address
                }}</span>
              </li>
              <li class="flex align-items-center mb-2 mt-3">
                <span style="width: 10px; height: 10px"></span
                ><span class="text-base font-medium">Country:</span
                ><span class="text-600 text-base font-medium ml-auto">{{
                  customer.customerInfo.country
                }}</span>
              </li>
            </router-link>

            <hr />
            <span class="block mb-1">
              <router-link
                :to="{ path: `/clients/${customer.id}` }"
                class="font-bold"
                ><i class="pi pi-pencil"></i> Edit</router-link
              >
              <a
                class="p-button-text ml-5 text-pink-800 font-bold"
                @click="deleteCustomer(customer.id)"
                ><i class="pi pi-trash"></i> Delete</a
              >
            </span>
          </div>
        </li>
      </ul>
    </ScrollPanel>
  </div>
</template>
<script>
import customerColRef from "../../firebase/firebase";
import { db } from "@/firebase/invoiceFire";
import {
  getDocs,
  doc,
  deleteDoc,
  query,
  collection,
  where,
} from "firebase/firestore";
import useAuth from "../../firebase/auth/useAuth";

export default {
  data() {
    return {
      customers: [],
      selectedDoc: null,
      uid: null,
    };
  },
  methods: {
    async fetchCustomers() {
      const q = query(
        collection(db, "customers"),
        where("userId", "==", this.uid)
      );
      const customerSnapShot = await getDocs(q);
      const customers = [];
      customerSnapShot.forEach((customer) => {
        const customerData = customer.data();
        customerData.id = customer.id;
        customers.push(customerData);
      });
      console.log(customers);
      this.customers = customers;
    },
    async deleteCustomer(customerId) {
      const customerRef = doc(customerColRef, customerId);
      await deleteDoc(customerRef);
      //  alert('customer deleted successfully!');
      this.$router.go();
    },
  },
  created() {
    const userId = useAuth();
    const { user } = userId;
    this.uid = user;
    this.fetchCustomers();
  },
};
</script>

