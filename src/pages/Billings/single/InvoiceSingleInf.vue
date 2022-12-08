<template>
  <div class="mb-2">
    <form @submit.prevent="updateStatus">
      <div class="font-medium text-2xl text-900 font-bold text-blue-800">
        Status: {{ invoiceInfo.status }}
      </div>
      <hr>
      <select class="text-primary-800" v-model="invoiceInfo.status">
        <option>Won</option>
        <option>Lost</option>
      </select>
      <Button
        type="submit"
        label="Change Status"
        class="p-button-outlined ml-2"
      />
    </form>
  </div>
  <div>
    <div class="surface-section justify-content-center p-2 lg:p-0">
      <div class="col-12 md:col-12 px-3">
        <div class="p-1">
          <div class="grid">
            <div class="col">
              <Image
                src="images/logob.png"
                width="350"
                alt="Image Text"
              />
            </div>
            <div class="col">
              <span class="block mb-2 font-bold text-center text-xl"
                >Invoice</span
              >
              <span class="block text-900 font-medium mb-2"
                >Invoice: SRN#35</span
              >
              <span class="block text-900 font-medium mb-2"
                >Invoice Date:
                {{
                  new Date(
                    invoiceInfo.createdAt.seconds * 1000
                  ).toLocaleDateString()
                }}</span
              >
              <span class="block text-900 font-medium mb-2"
                >Due Date:
                {{
                  new Date(
                    invoiceInfo.duedate.seconds * 1000
                  ).toLocaleDateString()
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-12">
        <div class="grid p-1">
          <div class="col">
            <span class="block font-bold mb-2">Our Info:</span>
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >KCT LTD</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Mwenge, Mpakani</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Kinondoni, Dar es Salaam</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Tanzania - 4311</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Phone: +255(0)659500006</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Email: sales@kctlimited.co.tz</span
            >
            <span class="block text-500 font-medium mb-2 text-yellow-500"
              >Tax ID: 140-006-564</span
            >
            <!-- <div class="text-900 font-medium text-xl">Mwenge, Mpakani</div> -->
          </div>
          <div class="col">
            <span class="block mb-2 font-bold">Customer:</span>
            <span class="block text-900 font-medium mb-2"
              >{{ invoiceInfo.customername }} {{ middlename }}
              {{ lastname }}</span
            >
            <!-- <span class="block text-900 font-medium mb-2">Songea</span> -->
            <span class="block text-900 font-medium mb-2">{{ address }}</span>
            <span class="block text-900 font-medium mb-2">{{ country }}</span>
            <span class="block text-900 font-medium mb-2"
              >Phone: +255 {{ contact }}</span
            >
            <span class="block text-900 font-medium mb-2"
              >Email: {{ email }}</span
            >
            <!-- <div class="text-900 font-medium text-xl">Mwenge, Mpakani</div> -->
          </div>
        </div>
        <div class="surface-card p-1">
          <table class="table mb-3" style="width: 100%">
            <thead
              class="
                col-12
                align-items-center
                text-700
                flex-wrap
                text-white
                bg-primary-800
                border-primary-800
                mb-2
                p-3
                w-full
                mt-auto
              "
            >
              <tr>
                <th style="text-align: left">Description</th>
                <th style="text-align: left">Price</th>
                <th>Qty</th>
                <th style="text-align: left">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p class="font-bold">First Installment</p>
                  {{ invoiceInfo.projectname }} (SQM {{ invoiceInfo.area }})
                </td>
                <td>
                  {{
                    formatPrice(
                      (invoiceInfo.area * invoiceInfo.unitprice) /
                        invoiceInfo.duration
                    )
                  }}/=
                </td>
                <td>1</td>
                <td>
                  {{
                    formatPrice(
                      (invoiceInfo.area * invoiceInfo.unitprice) /
                        invoiceInfo.duration
                    )
                  }}/=
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Divider></Divider>
        <div class="surface-card p-1">
          <p class="">{{ invoiceInfo.note }}</p>
        </div>
        <Divider></Divider>

        <div class="surface-card p-1">
          <div class="grid">
              <div class="col"></div>
              <div class="col"></div>
              <div class="col-3">
                <span class="block mb-6">Authorized Person</span>
                <div>MSHERI MVUNGI</div>
                <span>ACCOUNTANT</span>
              </div>
          </div>
          <div class="grid">
            <div class="col-8">
              <div class="block mb-2"
                >BANK: <span class="font-bold">CRDB</span><br /> ACCOUNT NAME: <span class="font-bold">KONNECT CONSTRUCT AND TRANSFORM LIMITED</span><br />
               ACCOUNT NUMBER: <span class="font-bold">0150481643100</span><br />
                TIN NUMBER: <span class="font-bold">140-006-564</span></div
              >
              <hr />
              <span class="block mb-2">Terms:</span>
              <!-- <span class="block mb-2 font-bold">Payment on receipt.</span>
              <span class="block mb-2">Payment due on receipt</span> -->
              <span class="block mb-3"
                >First monthly payment must be paid within 5 days of receiving
                the form. Other installment paid within 35 months.</span
              >
              <span class="block mb-2 font-bold text-green-700"
                >NOTE: TITLE DEED TO BE ISSUED BY COMPANY AND IT'S A SEPARATE
                COST.</span
              >
            </div>

            <div class="col-4">
              <span class="block mb-2 font-bold">Summary</span>
              <div class="flex alight-iterms-center">
                <div class="block mb-2">Duration:</div>
                <div class="ml-1">{{ invoiceInfo.duration }} (Month)</div>
              </div>
              <span class="block mb-2">
                Monthly Payment:
                {{
                  formatPrice(
                    (invoiceInfo.area * invoiceInfo.unitprice -
                      (invoiceInfo.area * invoiceInfo.unitprice) /
                        invoiceInfo.duration) /
                      (invoiceInfo.duration - 1)
                  )
                }}/=
              </span>
              <Hr></Hr>
              <span class="block mb-2">
                Due Amount:
                {{
                  formatPrice(
                    invoiceInfo.area * invoiceInfo.unitprice -
                      (invoiceInfo.area * invoiceInfo.unitprice) /
                        invoiceInfo.duration
                  )
                }}/=
              </span>
              <span class="block mb-2">
                Total Amount:
                {{ formatPrice(invoiceInfo.area * invoiceInfo.unitprice) }}/=
              </span>
              <Hr></Hr>
              <!-- <span class="block">


              </span> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-12 text-center">
      <Button class="p-button-success ml-2" @click="sendEmail"
        >Resend Email</Button
      >
      <!-- <Button class="p-button-outlined ml-2"> Download</Button>
      <a href="./files/doms.pdf" download class="download-btn">Down</a> -->
      <Button class="p-button-outlined ml-2" @click="print">Print</Button>
    </div>
  </div>
</template>
<script>
import invoiceColRef from "../../../firebase/fire";
import { getDoc, doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      invoiceId: null,
      docRef: null,
      lastname: null,
      middlename: null,
      address: null,
      userId: null,
      userName: null,
      email: null,
      contact: null,
      country: null,
      invoiceInfo: {
        projectname: null,
        area: null,
        duration: null,
        downpayment: null,
        unitprice: null,
        createdAt: "",
        duedate: "",
        note: null,
        customername: null,
        status: null,
      },
    };
  },
  methods: {
    async getInvoice() {
      const invoiceRef = doc(invoiceColRef, this.invoiceId);
      this.docRef = invoiceRef;
      const invoice = await getDoc(this.docRef);
      console.log(invoice.data());
      const invoiceData = invoice.data();
      this.invoiceInfo.projectname = invoiceData.invoiceInfo.projectname;
      this.invoiceInfo.area = invoiceData.invoiceInfo.area;
      this.invoiceInfo.customername = invoiceData.invoiceInfo.customername;
      this.invoiceInfo.downpayment = invoiceData.invoiceInfo.downpayment;
      this.invoiceInfo.note = invoiceData.invoiceInfo.note;
      this.invoiceInfo.duedate = invoiceData.invoiceInfo.duedate;
      this.invoiceInfo.createdAt = invoiceData.invoiceInfo.createdAt;
      this.invoiceInfo.unitprice = invoiceData.invoiceInfo.unitprice;
      this.invoiceInfo.duration = invoiceData.invoiceInfo.duration;
      this.lastname = invoiceData.lastname;
      this.middlename = invoiceData.middlename;
      this.address = invoiceData.address;
      this.email = invoiceData.email;
      this.country = invoiceData.country;
      this.contact = invoiceData.contact;
      this.invoiceInfo.status = invoiceData.invoiceInfo.status;
      this.userId = invoiceData.userId;
      this.userName = invoiceData.userName;
    },
    async updateStatus() {
      await setDoc(this.docRef, this.$data);
      // alert(`Invoice with the Id ${this.invoiceId} has been changed Status Successfully`);
      this.$router.push("/billings");
    },
    async print() {
      window.print();
    },
    async sendEmail() {
     window.open('mailto:test@example.com');
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
    const invoiceId = this.$route.params.invoiceId;
    this.invoiceId = invoiceId;
    this.getInvoice();
  },
};
</script>