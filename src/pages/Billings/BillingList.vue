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
          </div>
          <div class="col-6 md:col-4 mb-1 px-3">
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
    <!-- <Dialog
      header="Reminder"
      v-model:visible="displayModal"
      :style="{ width: '90vw' }"
      :modal="true"
    >
      <InvRem></InvRem>
    </Dialog> -->
    <!-- <div class="font-medium text-3xl text-900 font-bold text-green-800 mb-3">
      Hello, {{userName}}
    </div> -->

    <div class="card">
      <TabMenu :model="items" />
       <router-view />
        <div class="flex align-items-center flex-wrap text-sm">
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">INVOICES</span>
          <div class="text-700 mt-2 font-bold">{{invoices.length}}</div>
        </div>
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">WORTH</span>
          <div class="text-700 mt-2 font-bold">{{ formatPrice(worthInvoice)}}</div>
        </div>
        <div class="mr-5 mt-3">
          <span class="font-medium text-500">COMMISION</span>
          <div class="text-700 mt-2 font-bold">{{ formatPrice(totalCummisions)}}</div>
        </div>
      </div>
    </div>

    <h6 class="font-bold">Invoices</h6>

   
    <ScrollPanel style="width: 100%; height: 500px" class="custombar1">
           <ul
        class="list-none p-0 m-0"
        v-for="invoice in invoices"
        :key="invoice.id"
      >
        <li class="card">
          <!-- Invoice head/Customer name start -->
          <div class="col-12">
            <span class="block mb-1 text-blue-800 font-bold"
              >#number
              <Tag class="mr-2" severity="success" rounded>{{
                invoice.invoiceInfo.status
              }}</Tag>
            </span>
            <span class="block mb-1 text-900 font-semibold text-lg">
              {{ invoice.invoiceInfo.customername }} {{ invoice.middlename }}
              {{ invoice.lastname }}
            </span>
            <span
              >Created at: 
              {{
                new Date(
                  invoice.invoiceInfo.createdAt.seconds * 1000
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
                invoice.invoiceInfo.projectname
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
                    (invoice.invoiceInfo.area * invoice.invoiceInfo.unitprice) * 0.03
                  )
                }}/=
              </span>
            </li>
          </div>
          <div class="col-12">
            <span class="block mb-1 font-bold text-lg">
              {{
                formatPrice(
                  invoice.invoiceInfo.area * invoice.invoiceInfo.unitprice
                )
              }}/=</span
            >
            <span class="text-600"
              >Due date:
              {{
                new Date(
                  invoice.invoiceInfo.duedate.seconds * 1000
                ).toLocaleDateString()
              }}</span
            >
          </div>
          <hr />
          <!-- Reminder start -->
          <span class="block mb-1 text-600">
            <router-link
              :to="{ path: `/billings/single/${invoice.id}` }"
              class="mr-3 font-bold"
              >View
            </router-link>
            <router-link
              :to="{ path: `/billings/reminder/${invoice.id}` }"
              class="font-bold"
              >Add Reminder</router-link
            >
          </span>
        </li>
      </ul>
    </ScrollPanel> 

    <!-- <div class="speeddial-linear-demo" :style="{ position: 'relative', height: '500px' }">
                 <SpeedDial :model="items" direction="right" mask/>
            </div> -->
  </div>
</template>
<script>
import invoiceColRef from "../../firebase/fire";
import { db } from "@/firebase/invoiceFire";
import { getDocs, doc, deleteDoc, query, collection, where } from "firebase/firestore";
import useAuth from "../../firebase/auth/useAuth";
// import InvRem from "./reminder/InvoiceReminder.vue";

export default {
  // components: { InvRem },
  data() {
    return {
      invoices: [],
      userName: null,
      uid: null,
      selectedDoc: null,
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
    async fetchinvoices() {
      const q = query(collection(db, "invoices"), where('userId','==',this.uid));
      const invoicesnapShot = await getDocs(q);
      const invoices = [];
      invoicesnapShot.forEach((invoice) => {
        const invoiceData = invoice.data();
        console.log(invoiceData.customer_id);

        invoiceData.id = invoice.id;
        invoices.push(invoiceData);
      });
      console.log(invoices);
      const [{ userName }] = invoices;
      console.log(userName);
      this.userName = userName;
      this.invoices = invoices;
    },
    async deleteinvoice(invoiceId) {
      const invoiceRef = doc(invoiceColRef, invoiceId);
      await deleteDoc(invoiceRef);
      // alert("invoice deleted successfully!");
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
    const userI = useAuth();
    const { user } = userI;
    this.uid = user;
    this.fetchinvoices();
  },
  computed: {
    totalCummisions() {
      return this.invoices.reduce(
        (acc, item) => 
        acc + item.invoiceInfo.unitprice * item.invoiceInfo.area * 0.03,0
      );
    },
    worthInvoice() {
      return this.invoices.reduce(
        (acc, item) => 
        acc + item.invoiceInfo.unitprice * item.invoiceInfo.area,0
      )
    }
  },
};
</script>
