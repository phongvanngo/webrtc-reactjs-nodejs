import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASEURL } from "../constants";

const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor 0

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
