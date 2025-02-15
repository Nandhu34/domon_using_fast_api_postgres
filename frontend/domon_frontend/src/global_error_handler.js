import axios from "axios";



const globalErrorHandler = axios.create({
  baseURL: "https://localhost:8000", // Replace with your API base URL
  withCredentials: true, // If using cookies for authentication
});

// ✅ Global response interceptor
globalErrorHandler.interceptors.response.use(
  (response) => response, // If response is OK, return it
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Forward error for other handling
  }
);

export default globalErrorHandler;
