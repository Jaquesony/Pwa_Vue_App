<template>
  <Transition name="slide-up" mode="out-in">
    <Landing v-if="$route.path === '/landing'" @change-theme="changeTheme" />
    <Login v-else-if="$route.path === '/login'" />
    <!-- <SignUpFlow :hideSteps="true" v-else-if="routeStartsWith('/signup')" /> -->
    <Error v-else-if="$route.path === '/error'" />
    <NotFound v-else-if="$route.path === '/notfound'" />
    <Access v-else-if="$route.path === '/access'" />
    <App
      v-else-if="
        routeStartsWith('/billings') ||
        routeStartsWith('/dashboard') ||
        routeStartsWith('/clients') ||
        routeStartsWith('/profile')
      "
      @change-theme="changeTheme"
    />
    <NotFound v-else />
  </Transition>
</template>

<script>
import EventBus from "./AppEventBus";
import App from "./App";
import Landing from "./pages/LandingDemo";
import Login from "./pages/Login";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Access from "./pages/Access";
// import SignUpFlow from "./pages/SignUp/SignUpFlow.vue";

export default {
  methods: {
    changeTheme(event) {
      let themeElement = document.getElementById("theme-link");
      themeElement.setAttribute(
        "href",
        themeElement
          .getAttribute("href")
          .replace(this.$appState.theme, event.theme)
      );
      this.$appState.theme = event.theme;
      this.$appState.darkTheme = event.dark;
      EventBus.emit("change-theme", event);

      if (event.theme.startsWith("md")) {
        this.$primevue.config.ripple = true;
      }
    },

    routeStartsWith(path) {
      return this.$route.path.startsWith(path);
    },
  },
  components: {
    App,
    Landing,
    Login,
    Error,
    NotFound,
    Access,
  },
};
</script>
<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>