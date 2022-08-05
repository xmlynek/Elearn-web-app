import axios from "axios";

export const config = {
  localhost: {
    apiUrl: `/api/v1`,
  },
};

export const axiosPrivate = axios.create({
  baseURL: config.localhost.apiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
