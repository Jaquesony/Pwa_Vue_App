<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar border-noround" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <!-- <div
          class="
            bg-bluegray-900
            text-gray-100
            p-3
            flex
            justify-content-between
            lg:justify-content-center
            align-items-center
            flex-wrap
          "
        >
          <div class="font-bold mr-8">🔥 Heads up!</div>
          <div class="align-items-center hidden lg:flex">
            <span class="line-height-3">
              Email validation is still pending. Login onto your email account
              to complete validation.
            </span>
          </div>
          <a class="flex align-items-center ml-2 mr-8">
            <a class="text-white" href="#">
              <span class="underline font-bold">Learn More</span>
            </a>
          </a>
          <a
            v-ripple
            class="
              flex
              align-items-center
              no-underline
              justify-content-center
              border-circle
              text-gray-50
              hover:bg-bluegray-700
              cursor-pointer
              transition-colors transition-duration-150
              p-ripple
            "
            style="width: 2rem; height: 2rem"
          >
            <i class="pi pi-times"></i>
          </a>
        </div> -->
        <Transition>
          <Billings v-if="routeStartsWith('/billings')" />
          <CRMDashboard
            v-else-if="routeStartsWith('/dashboard')"
          ></CRMDashboard>
          <Clients v-else-if="routeStartsWith('/clients')" />
          <Profile v-else-if="routeStartsWith('/profile')" />
          <div v-else></div>
        </Transition>
      </div>
      <AppFooter />
    </div>

    <!-- <AppConfig
      :layoutMode="layoutMode"
      @layout-change="onLayoutChange"
      @change-theme="changeTheme"
    /> -->
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
  </div>
</template>

<script>
import AppTopBar from "./AppTopbar.vue";
import AppMenu from "./AppMenu.vue";
// import AppConfig from "./AppConfig.vue";
import AppFooter from "./AppFooter.vue";
import Billings from "./pages/Billings/index.vue";
import CRMDashboard from "./pages/Dashboard/CRMDashboard.vue";
import Clients from "./pages/Clients/index.vue";
import Profile from "./pages/Profile/index.vue"

// import NotFound from "./pages/NotFound.vue";

export default {
  emits: ["change-theme"],
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          // label: "Home",
          items: [
            {
              label: "Notes",
              icon: "pi pi-fw pi-book",
              to: "/dashboard",
            },
          ],
        },
         {
          // label: "customers",
          items: [
            {
              label: "Customers Info",
              icon: "pi pi-fw pi-users",
              to: "/clients",
              // badge: "NEW",
            },
            {
              label: "Add customer",
              icon: "pi pi-fw pi-user-plus",
              to: "/clients/create",
            },
          ],
        },
        {
          // label: "Invoice",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Invoice Records",
              icon: "pi pi-fw pi-money-bill",
              to: "/billings",
            },
            // {
            //   label: "Record Invoice",
            //   icon: "pi pi-fw pi-plus",
            //   to: "/billings/delayed",
            // },
          ],
        },
         {
          // label: "Profile",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Cummission",
              icon: "pi pi-fw pi-dollar",
              to: "/profile",
            },
            // {
            //   label: "",
            //   icon: "pi pi-fw pi-plus",
            //   to: "/billings/delayed",
            // },
          ],
        },

        // {
        //   label: "",
        //   icon: "pi pi-fw pi-search",
        //   items: [
        //     {
        //       label: "IT Assistant",
        //       icon: "pi pi-fw pi-bookmark",
        //       items: [
        //         {
        //           label: "Positions",
        //           icon: "pi pi-fw pi-bookmark",
        //           to: "/team",
        //           items: [
        //             { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //         {
        //           label: "Roles",
        //           icon: "pi pi-fw pi-bookmark",
        //           items: [
        //             { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //       ],
        //     }
        //   ],
        // },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },

    routeStartsWith(path) {
      return this.$route.path.startsWith(path);
    },

    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }

      return true;
    },
    changeTheme(event) {
      this.$emit("change-theme", event);
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ];
    },
    logo() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    // AppConfig: AppConfig,
    AppFooter: AppFooter,
    Billings,
    CRMDashboard,
    Clients,
    Profile
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
