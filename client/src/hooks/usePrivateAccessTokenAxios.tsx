import axios from "axios";
import { useContext } from "react";
import { config } from "../api/config";
import AuthContext from "../store/auth-context";

// inspired and used from Dave Gray
function usePrivateAxios(endpointUrl: string) {
  const { refreshToken } = useContext(AuthContext);

  let axiosPrivate = axios.create({
    baseURL: config.localhost.apiUrl + endpointUrl,
    headers: { "Content-Type": "application/json" },
  });

  axiosPrivate.interceptors.request.use(
    (config) => {
      config.headers!["Authorization"] = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newToken = await refreshToken();
        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
}

export default usePrivateAxios;
