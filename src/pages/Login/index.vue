<template>
  <div class="p-5 flex justify-items-center justify-content-center">
        <div class="surface-card p-4 shadow-none border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <img
          src="images/awamupay.jpg"
          alt="Image"
          height="50"
          class="mb-3"
        />
        <div class="text-900 text-3xl font-medium mb-3">AwamuPay CRM</div>
        <!-- <span class="text-600 font-medium line-height-3"
          >Don't have an account?</span
        > -->
        <!-- <router-link
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          to="/signup"
        >
          Create today!
        </router-link> -->
      </div>

      <form @submit.prevent="logginIn">
        <label for="emailCtl" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="emailCtl"
          type="text"
          v-model="username"
          placeholder="Email"
          class="w-full mb-3"
          style="padding: 1rem"
        />

        <label for="passwordCtl" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <Password
          id="passwordCtl"
          class="w-full mb-3"
          :toggleMask="true"
          v-model="password"
          placeholder="Password"
          inputClass="w-full"
          inputStyle="padding:1rem"
        >
        </Password>

        <div class="flex align-items-center justify-content-between mb-6">
          <!-- <div class="flex align-items-center">
            <Checkbox
              id="rememberme1"
              :binary="true"
              v-model="checked"
              class="mr-2"
            ></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div> -->
          <!-- <a
            class="
              font-medium
              no-underline
              ml-2
              text-blue-500 text-right
              cursor-pointer
            "
            >Forgot password?</a
          > -->
        </div>

        <Button
          icon="pi pi-user"
          class="w-full"
          type="submit"
        >Login</Button>
          <!-- <Button
        
          icon="pi pi-user"
          class="w-full"
          @click="siginingUp"
        >SignUp</Button> -->
      </form>
    </div>
     <div
      v-if="!ready && error"
      class="absolute w-1/3 p-4 text-center text-red-800 bg-red-300 rounded-lg  bottom-2 right-2"
    >
      {{ error }}
    </div>
  </div>
</template>
<script setup>
import useAuth from "../../firebase/auth/useAuth";
import  useError from "../../firebase/auth/useError";
import { ref } from "vue";
import {useRouter} from "vue-router";

const { isAuthenticated, login, signup } = useAuth();

const username = ref("");
const password = ref("");

const router = useRouter();

const logginIn = async () => {
   await login(username.value, password.value);
    goToHome();

   
};
const siginingUp = async () => {
  await signup(username.value, password.value);
  goToHome();
};
const goToHome = () => {
  if(isAuthenticated.value) {
    router.push("/billings");
  }else {
    setError("Invalid username or password");
    start();
  }
};
const { error, setError } = useError();

import { useTimeout, promiseTimeout } from "@vueuse/core";

const { ready, start } = useTimeout(3000, {controls: true});


</script>
