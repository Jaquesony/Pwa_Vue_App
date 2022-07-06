import { ref } from "vue";
import axiosInstance from "../http";

export default function useHttpFileUpload(url, config = { method: "post" }) {
  const loading = ref(false);
  const error = ref(null);
  let uploadCb = null;

  const watchUploadProgress = (fn) => (uploadCb = fn);

  const upload = (formData) => {
    loading.value = true;
    return axiosInstance[config.method](url, formData, {
      onUploadProgress: (evt) => {
        if (uploadCb != null) {
          uploadCb(evt);
        }
      },
      ...config,
    })
      .then(() => {
        console.log("Done uploading!");
      })
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  return { loading, error, upload, watchUploadProgress };
}
