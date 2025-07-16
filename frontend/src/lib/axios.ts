// src/lib/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // 기본값은 로컬
  withCredentials: false, // 필요한 경우 true
})

export default axiosInstance