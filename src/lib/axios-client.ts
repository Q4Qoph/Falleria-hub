import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Interceptor error:", error)

    const status = error.response?.status
    const data = error.response?.data

    // Handle both HTTP 401 and JSON error messages
    if (status === 401 || data?.error === "Unauthorized") {
      if (typeof window !== "undefined") {
        console.log("Logging out due to unauthorized response...")
        localStorage.removeItem("authToken")
        window.location.href = "/login"
      }
    } else if (!error.response) {
      // Log network or CORS errors
      console.warn("No response received from server. Check network/CORS.")
    }

    return Promise.reject(error)
  },
)


export default apiClient
