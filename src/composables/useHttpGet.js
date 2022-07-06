import { ref } from "vue";

import axiosInstance from "../http";

export default function useHttpGet(url, config = {}) {
  const loading = ref(false);
  const error = ref(null);

  const httpGet = (params) => {
    loading.value = true;
    return axiosInstance
      .get(url, { ...config, ...params })
      .then(({ data }) => data)
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };
  const httpGet1 = (params) => {
    loading.value = true;
    return axiosInstance
      .get(url, { ...config, ...params })
      .then(({ data }) => data)
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };
  const httpGet2 = (params) => {
    loading.value = true;
    return axiosInstance
      .get(url, { ...config, ...params })
      .then(({ data }) => data)
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  return { loading, error, httpGet, httpGet1, httpGet2 };
}
