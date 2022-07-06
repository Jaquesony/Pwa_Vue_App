import { onMounted, ref } from "vue";

import axiosInstance from "../../../http";

export default function useCompanyStats(url) {
  const loading = ref(false);
  const error = ref(null);
  const stats = ref({
    customersByStatuses: { active: 0, inactive: 0 },
    adoptions: [],
    projectsByStatuses: { open: 0, closed: 0 },
  });

  const fetchStats = () => {
    loading.value = true;
    axiosInstance
      .get(url)
      .then(({ data: { data } }) => (stats.value = data))
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  onMounted(() => fetchStats());

  return { loading, error, stats, fetchStats };
}
