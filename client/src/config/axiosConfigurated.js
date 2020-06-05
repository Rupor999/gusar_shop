import axios from "axios";

export const axiosConfigurated = axios.create({
  // baseURL: "http://localhost:3001/api/v1",
  baseURL: "http://localhost:3001",
  // baseURL: "http://46.254.166.64:3001",

  timeout: 5000
});
