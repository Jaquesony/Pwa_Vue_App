import axios from "axios";
import { AuthService } from "./service/AuthService";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // If url is not public (REQUIRES AUTHENTICATION),
  // We're appending authorization header
  if (!/\/auth\/login/.test(config.url)) {
    config.headers["Authorization"] = `Bearer ${AuthService.getToken()}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(async (response) => {
  // We're going to intercept the successful login response.
  // First we're going to save the token
  // Then we're going to issue a request to fetch user details
  if (/^\/auth\/login/.test(response.config.url)) {
    // Save the token
    AuthService.saveToken(response.data);
    // Issue the request to get own details
    const response2 = await axiosInstance.get("/auth/me");

    // Return response 2
    return response2;
  }

  // If this is a response to the `/auth/me` request,
  // we're going to save logged in data to the session storage
  if (/\/auth\/me/.test(response.config.url)) {
    // Save user data to the session storage.
    AuthService.saveCurrentUserData(response.data);
  }

  return response;
});

export default axiosInstance;
