import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use( // This line sets up an interceptor for outgoing HTTP requests made using the Axios instance. The interceptor allows you to modify the request configuration before it is sent to the server. In this case, it is used to automatically attach the JWT token to the Authorization header of each request if a token is present in local storage.
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // This line adds the JWT token to the Authorization header of the request. The token is prefixed with "Bearer " to indicate that it is a Bearer token, which is a common way to send tokens in HTTP headers for authentication purposes.
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;