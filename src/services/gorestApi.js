import axios from "axios";

export const gorestApi = axios.create({
  // baseURL: "https://dummyjson.com",
  baseURL: "https://gorest.co.in/public/v2",
});
