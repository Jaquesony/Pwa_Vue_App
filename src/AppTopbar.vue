<template>
  <div>
    <BlockUI :blocked="loggingOut" :fullScreen="true"></BlockUI>
    <Toast />
    <div class="layout-topbar">
      <router-link to="/" class="layout-topbar-logo">
        <!-- <img alt="Logo" :src="topbarImage()" />
        <span>{{ companyName }}</span> -->
        <h5 class="font-bold">Sales Web App</h5>
      </router-link>
      <button
        class="p-link layout-menu-button layout-topbar-button"
        @click="onMenuToggle"
      >
        <i class="pi pi-bars"></i>
      </button>

      <button
        class="p-link layout-topbar-menu-button layout-topbar-button"
        v-styleclass="{
          selector: '@next',
          enterClass: 'hidden',
          enterActiveClass: 'scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>
      <ul class="layout-topbar-menu hidden lg:flex origin-top">
        <!-- <li>
        <button class="p-link layout-topbar-button">
          <InputSwitch
            :modelValue="rippleActive"
            @update:modelValue="toggleDarkMode"
          />
        </button>
      </li> -->
        <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li> -->
        <li>
          <button class="p-link layout-topbar-button" @click="logout">
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </li>
        <li>
          <button class="p-link layout-topbar-button">
            <!-- <i class="pi pi-user"></i>
            <span>{{ userName }}</span> -->
          </button>
        </li>
        <li>
          <button class="p-link layout-topbar-button" @click="logout({})">
            <!-- <i class="pi pi-sign-out"></i>
            <span>Logout</span> -->
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

import { useToast } from "primevue/usetoast";

import useLogout from "./composables/useLogout";
// import useCompanyInfo from "./composables/useCompanyInfo";
import useAuthInfo from "./composables/useAuthInfo";
import useAuth from "@/firebase/auth/useAuth";
// const { logout } = useAuth();


const emit = defineEmits(["menu-toggle", "topbar-menu-toggle", "change-theme"]);

const {
  error: logoutError,
  loading: loggingOut,
  logout,
} = useLogout("/auth/logout", "/login");

const toast = useToast();

watch(logoutError, () => {
  if (logoutError.value != null) {
    console.log(logoutError.value);
    // Show toast
    toast.add({
      severity: "error",
      summary: "An error has occured",
      detail: logoutError.value.message,
      life: 8000,
    });
  }
});


const { firstName, lastName } = useAuthInfo();

const userName = computed(() => `${firstName} ${lastName}`);

const onMenuToggle = (event) => emit("menu-toggle", event);
// const onTopbarMenuToggle = (event) => emit("topbar-menu-toggle", event);
// const topbarImage = () => "images/blocks/logos/hyper.svg";
// const changeTheme = (event, theme, dark) =>
//   emit("change-theme", { theme, dark });
// const toggleDarkTheme = (on) => console.log(on);
// const darkTheme = ref();
// const rippleActive = ref(true);
</script>
