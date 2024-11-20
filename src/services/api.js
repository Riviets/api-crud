import axios from "axios"

const API_BASE_URL = "http://localhost:8080"

export async function fetchWorkers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/workers`)
    return response.data
  } catch (error) {
    console.error("Error fetching workers:", error)
    return []
  }
}
