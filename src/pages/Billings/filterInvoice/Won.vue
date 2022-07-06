<template>
  <div>
    <!-- <Toast /> -->
    <div>
      <!-- <Dialog
        header="More options"
        v-model:visible="displayPosition"
        :style="{ width: '100vw' }"
        :position="position"
        :modal="true"
      >
        <div class="grid text-center">
          <div class="col-6 md:col-4 mb-1 px-3">
            <span
              class="p-3 mb-1 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-phone text-4xl text-blue-500"></i>
            </span>
            <div class="text-900 mb-1 font-medium">Call</div>
          </div>
          <div class="col-6 md:col-4 mb-1 px-3">
            <span
              class="p-3 mb-1 inline-block surface-card"
              style="border-radius: 10px"
            >
              <i class="pi pi-envelope text-4xl text-blue-500"></i>
            </span>
            <div class="text-900 mb-1 font-medium">Message</div>
          </div> -->
          <!-- <div class="col-6 md:col-4 mb-1 px-3">
          <span
            class="p-3 mb-1 inline-block surface-card"
            style="border-radius: 10px"
          >
            <i class="pi pi-calendar text-4xl text-blue-500"></i>
          </span>
          <div class="text-900 mb-1 font-medium">Reminder</div>
        </div> -->
          <!-- <div class="col-6 md:col-4 mb-1 px-3">
            <a href="https://wa.me//">
              <span
                class="p-3 mb-1 inline-block surface-card"
                style="border-radius: 10px"
              >
                <i class="pi pi-whatsapp text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-1 font-medium">Whatsapp</div>
            </a>
          </div>
        </div>
      </Dialog> -->
    </div>
   <!-- <div class="font-medium text-3xl text-900 font-bold text-green-800 mb-3">
      Hello, {{userName}}
    </div> -->
       <div class="card">
      <TabMenu :model="items" />
       <router-view />
        <div class="flex align-items-center flex-wrap text-sm">
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">INVOICES</span>
          <div class="text-700 mt-2 font-bold">{{cummisions.length}}</div>
        </div>
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">WORTH</span>
          <div class="text-700 mt-2 font-bold">{{ formatPrice(worthInvoice)}}</div>
        </div>
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">COMMISION</span>
          <div class="text-700 mt-2 font-bold">{{ formatPrice(totalCummissions)}}</div>
        </div>
      </div>
    </div>

    <h6 class="font-bold">Invoices</h6>
      <ScrollPanel style="width: 100%; height: 550px" class="custombar1">
        <ul class="list-none p-0 m-0" v-for="cumm in cummisions" :key="cumm.id">
          <li class="card">
          <!-- Invoice head/Customer name start -->
          <div class="col-12">
            <span class="block mb-1 text-blue-800 font-bold"
              >#number
              <Tag class="mr-2" severity="success" rounded>{{
                cumm.invoiceInfo.status
              }}</Tag>
            </span>
            <span class="block mb-1 text-900 font-semibold text-lg">
              {{ cumm.invoiceInfo.customername }} {{ cumm.middlename }}
              {{ cumm.lastname }}
            </span>
            <span
              >Created at: 
              {{
                new Date(
                  cumm.invoiceInfo.createdAt.seconds * 1000
                ).toLocaleDateString()
              }}
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
            <li class="flex align-items-center mb-2 m0px">
              <span
                class="border-round bg-cyan-500 mr-3 flex-shrink-0"
                style="width: 10px; height: 10px"
              ></span
              ><span class="text-base font-medium text-90">Commision</span
              ><span class="text-600 text-base font-medium ml-auto">
                {{
                  formatPrice(
                    (cumm.invoiceInfo.area * cumm.invoiceInfo.unitprice) *0.03
                  )
                }}/=
              </span>
            </li>
          </div>
          <div class="col-12">
            <span class="block mb-1 font-bold text-lg">
              {{
                formatPrice(
                  cumm.invoiceInfo.area * cumm.invoiceInfo.unitprice
                )
              }}/=</span
            >
            <span class="text-600"
              >Due date:
              {{
                new Date(
                  cumm.invoiceInfo.duedate.seconds * 1000
                ).toLocaleDateString()
              }}</span
            >
          </div>
          <hr />
          <!-- Reminder start -->
          <span class="block mb-1 text-600">
            <router-link
              :to="{ path: `/billings/single/${cumm.id}` }"
              class="mr-3 font-bold"
              >View
            </router-link>
            <router-link
              :to="{ path: `/billings/reminder/${cumm.id}` }"
              class="font-bold"
              >Add Reminder</router-link
            >
          </span>
        </li>
        </ul>
      </ScrollPanel>
  </div>
</template>
<script>
import cummissionColRef from "@/firebase/fire";
import { db } from "@/firebase/invoiceFire";
import { getDocs, doc, deleteDoc,where,query,collection } from "firebase/firestore";
import useAuth from "@/firebase/auth/useAuth";
// import InvRem from "./reminder/cummisionReminder.vue";

export default {
  // components: { InvRem },
  data() {
    return {
      cummisions: [],
      userName: null,
      selectedDoc: null,
      uid: null,
       position: "center",
      displayMaximizable: false,
      displayPosition: false,
      displayModal: false,
          items: [
        {
          label: "All",
          to: '/billings/all'
        },
        {
          label: "Pending",
          to: '/billings/pending'
        },
        {
          label: "Won",
          to: '/billings/won'
        },
        {
          label: "Lost",
          to: '/billings/lost'
        }
      ],
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
      const [{ userName }] = cummisions;
      this.userName = userName;
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
      openPosition(position) {
      this.position = position;
      this.displayPosition = true;
    },
    openModal() {
      this.displayModal = true;
    },
  },
  created() {
    const userId = useAuth();
    const { user } = userId;
    this.uid = user;
    this.fetchCummions();
  },
   computed: {
    totalCummissions() {
      return this.cummisions.reduce(
        (acc, item) =>
          acc + item.invoiceInfo.unitprice * item.invoiceInfo.area * 0.03,
        0
      );
    },
        worthInvoice() {
      return this.cummisions.reduce(
        (acc, item) => 
        acc + item.invoiceInfo.unitprice * item.invoiceInfo.area,0
      )
    }
  },
};
</script>


