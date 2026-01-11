import axios from "axios";

const api = axios.create({
  baseURL: "https://yellow-laws-agree.loca.lt/api/v1", // New stable tunnel for Gemini/Ollama backend
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true", // Required to skip localtunnel welcome page
  },
});

export default api;
