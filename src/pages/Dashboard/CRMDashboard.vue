<template>
  <div class="">
   <p class="font-medium text-3xl text-900 font-bold text-green-800"> Hello, {{userName}}</p>
    <div class="font-medium text-2xl text-900 font-bold text-blue-800 mb-3">
      Note
    </div>
    <ScrollPanel style="width: 100%; height: 600px" class="custombar1">
      <ul
        class="list-none p-0 m-0"
        v-for="reminder in reminders"
        :key="reminder.id"
      >
        <li class="flex justify-content-between mb-2 card">
          <div>
            <span class="block mb-1 text-blue-800 font-bold">#number</span>
               <span class="block mb-1 text-900 text-2xl"
              >Reminder Date:
              {{
                new Date(
                  reminder.reminderInfo.duedate.seconds * 1000
                ).toLocaleDateString()
              }}
            </span>
            <hr />
            <span class="block mb-1 text-blue-800 text-lg font-bold">
              {{ reminder.firstname }} {{ reminder.middlename }}
              {{ reminder.lastname }}
            </span>
            <span class="block mb-2"
              >Created At:
              {{
                new Date(
                  reminder.reminderInfo.createdAt.seconds * 1000
                ).toLocaleDateString()
              }}
            </span>
            <div class="block mb-1 text-900">
              {{ reminder.reminderInfo.note }}
            </div>
            <!-- <span class="block mb-1 text-600 font-bold">
              {{ reminder.projectname }}
            </span> -->
                <li class="flex align-items-center mb-2 mt-3">
              <span
                class="border-round bg-purple-500 mr-3 flex-shrink-0"
                style="width: 10px; height: 10px"
              ></span
              ><span class="text-base font-medium">Project</span
              ><span class="text-600 text-base font-medium ml-auto">{{
                reminder.projectname
              }}</span>
            </li>
            <hr />
            <!-- <span class="block mb-1 text-600 font-bold">
              {{ formatPrice(reminder.area * reminder.unitprice) }}/=
            </span> -->
            
          
            <span class="block mb-1 text-600 font-bold">
              <!-- <router-link :to="{ path:`/clients/${reminder.id}`}" class="font-bold">Edit</router-link> -->
              <a
                class="p-button-text ml-2 text-pink-800 font-bold"
                @click="deletereminder(reminder.id)"
                ><i class="pi pi-trash"></i> Delete</a>
            </span>
          </div>

          <div class="w-6 md:w-2 flex justify-content-end">
            <span>
              <!-- <i class="pi pi-phone text-2xl text-blue-500 mr-2"></i> -->
            </span>
            <span>
              <a href="https://wa.me//">
                <!-- <i class="pi pi-whatsapp text-2xl text-blue-500"></i> -->
              </a>
            </span>
          </div>
        </li>
      </ul>
    </ScrollPanel>
  </div>
</template>
<script>
import reminderColRef from "../../firebase/calendarfire";
import { getDocs, doc, deleteDoc, query, collection, where } from "firebase/firestore";
import { db } from "@/firebase/invoiceFire";
import useAuth from "../../firebase/auth/useAuth";
// const { isAuthenticated, user } = useAuth();

export default {
  data() {
    return {
      reminders: [],
      userName: null,
      uid: null,
    }
  },
methods: {
async fetchReminder() {
  const q = query(collection(db,"reminders"), where('userId','==',this.uid))
  const remindersnapShot = await getDocs(q);
  const remindersD = [];
  remindersnapShot.forEach((reminder) => {
    const reminderData = reminder.data();
    reminderData.id = reminder.id;
    remindersD.push(reminderData);
  });
  console.log(remindersD);
  const [{userName}] = remindersD;
  this.userName = userName;
  this.reminders = remindersD;
},
async deletereminder(reminderId) {
  const reminderRef = doc(reminderColRef, reminderId);
  await deleteDoc(reminderRef);
  // alert("reminder deleted successfully!");
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
created(){
  const userid = useAuth();
  const { user } = userid;
  this.uid = user;
  this.fetchReminder();
},
}
</script>