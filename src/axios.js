import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/unicricket360/api/v1/",
  withCredentials: true, // ✅ send/receive cookies
});

export default instance;