import axios from "axios";


export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Rotating token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== "/refresh") {
      originalRequest._retry = true;

      const response = await api.post("/refresh", {}, { withCredentials: true });
      const newToken = response.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      originalRequest.headers["Authorization"] = "Bearer " + newToken;
      window.location.reload();

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
