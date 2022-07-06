import { ref, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "../../http";

export default function useLogin() {
  const email = ref("");
  const password = ref("");
  const checked = ref(false);
  const submitted = ref(false);
  const loading = ref(false);
  const errors = ref([]);

  const router = useRouter();
  const route = useRoute();

  const login = () => {
    submitted.value = true;
    loading.value = true;
    axiosInstance
      .post("/auth/login", { email: unref(email), password: unref(password) })
      .then(() => {
        // If user tried to access a route before and was rejected
        // Due to authentication failure
        if (route.query.redirect) {
          return router.replace(route.query.redirect);
        }
        // Otherwise, redirect to the home page
        return router.replace({ name: "dashboard" });
      })
      .catch((e) => {
        if (e.response) {
          errors.value = [e.response.data.message];
        } else {
          errors.value = [e.message || "An unknown error has occurred"];
        }
      })
      .finally(() => {
        submitted.value = false;
        loading.value = false;
      });
  };

  return { email, password, checked, submitted, loading, errors, login };
}
