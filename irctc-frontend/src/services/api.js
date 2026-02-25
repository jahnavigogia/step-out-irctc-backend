import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Request interceptor
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");

  if (
    req.url !== "login/" &&
    req.url !== "register/" &&
    token
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Response interceptor (auto refresh)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", response.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;