import { ref } from "vue";
import axiosInstance from "../http";

export default function useHttpPost(url, config = {}) {
  const loading = ref(false);
  const error = ref(null);
  const responseData = ref(null);

  const submit = (data) => {
    loading.value = true;
    return axiosInstance
      .post(url, data, config)
      .then(({ data }) => (responseData.value = data))
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  return {
    submit,
    loading,
    error,
    responseData,
  };
}
