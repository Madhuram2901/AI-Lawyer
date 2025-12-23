import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.29.149:8000/api/v1",
  timeout: 300000, // 5 minutes - plenty of time for AI analysis
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
