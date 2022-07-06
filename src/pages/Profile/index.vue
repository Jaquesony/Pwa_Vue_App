<template>
  <div>
    <div class="card">
      <div class="font-medium text-3xl text-500 mb-3">
        Total Cummissions: <span class="text-primary-900"> {{ formatPrice(totalCummission) }}/=
          </span>
      </div>
    </div>
    <hr />
      <ScrollPanel style="width: 100%; height: 550px" class="custombar1">
        <ul class="list-none p-0 m-0" v-for="cumm in cummisions" :key="cumm.id">
          <li
            class="card"
          >
            <div>
              <span class="block mb-1 text-blue-800 font-bold">#number  <Tag class="mr-2" severity="success" rounded>{{
                  cumm.invoiceInfo.status
                }}</Tag></span>
              <span class="block mb-1 text-900 font-semibold text-lg">
                {{ cumm.invoiceInfo.customername }} {{ cumm.middlename }}
                {{ cumm.lastname }}
               
              </span>
                 <li class="flex align-items-center mb-2 mt-3">
              <span
                class="border-round bg-purple-500 mr-3 flex-shrink-0"
                style="width: 10px; height: 10px"
              ></span
              ><span class="text-base font-medium text-90">Project</span
              ><span class="text-600 text-base font-medium ml-auto">{{
                cumm.invoiceInfo.projectname
              }}</span>
            </li>
               <li class="flex align-items-center mb-2 mt-3">
              <span
                class="border-round bg-cyan-500 mr-3 flex-shrink-0"
                style="width: 10px; height: 10px"
              ></span
              ><span class="text-base font-medium text-90">Plot Value</span
              ><span class="text-600 text-base font-medium ml-auto"> {{
                  formatPrice(
                    cumm.invoiceInfo.area * cumm.invoiceInfo.unitprice
                  )
                }}/=</span>
            </li>
            </div>
            <hr />
            <div class="ml-4">
              <span class="block text-primary-800 font-bold">Cummision</span>
              <span class="font-bold text-lg text-primary-800">
                {{
                  formatPrice(
                    (cumm.invoiceInfo.area * cumm.invoiceInfo.unitprice) * 0.03
                  )
                }}/=</span
              >
            </div>
          </li>
        </ul>
      </ScrollPanel>
    </div>
</template>
<script>
import cummissionColRef from "../../firebase/fire";
import { db } from "@/firebase/invoiceFire";
import { getDocs, doc, deleteDoc,where,query,collection } from "firebase/firestore";
import useAuth from "@/firebase/auth/useAuth";
// import InvRem from "./reminder/cummisionReminder.vue";

export default {
  // components: { InvRem },
  data() {
    return {
      cummisions: [],
      selectedDoc: null,
      uid: null,
    };
  },
  methods: {
    async fetchCummions() {
      // filter to get users with 'dob' after 1990
      const q = query(collection(db, 'invoices'), where('invoiceInfo.status', '==', 'Won'), where('userId','==',this.uid));
      const cummisionsnapShot = await getDocs(q);
      const cummisions = [];
      cummisionsnapShot.forEach((cummision) => {
        const cummData = cummision.data();
        console.log(cummData.customer_id);

        cummData.id = cummision.id;
        cummisions.push(cummData);
      });
      console.log(cummisions);
      this.cummisions = cummisions;
    },
    async deletecummision(cummisionId) {
      const cummisionRef = doc(cummissionColRef, cummisionId);
      await deleteDoc(cummisionRef);
      // alert("cummision deleted successfully!");
      this.$router.go();
    },
    formatPrice(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "TZS",
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  },
  created() {
    const userId = useAuth();
    const { user } = userId;
    this.uid = user;
    this.fetchCummions();
  },
  computed: {
    totalCummission() {
      return this.cummisions.reduce(
        (acc, item) =>
          acc + item.invoiceInfo.unitprice * item.invoiceInfo.area * 0.03,
        0
      );
    },
  },
};
</script>


