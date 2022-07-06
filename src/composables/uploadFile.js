import axiosInstance from "../http";

/**
 * Upload files to the server
 * @param {File[]} files files to upload
 * @param {string} url url to upload the files to
 * @returns {Promise<any>}
 */
export default function uploadFile(files, url) {
  const formData = new FormData();

  // for (const file of files)
  formData.append("worksheet", files[0]);

  return axiosInstance
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);
}
