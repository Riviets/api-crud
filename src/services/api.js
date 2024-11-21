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

export async function updateWorker(workerId, workerData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/workers/${workerId}`,
        workerData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating worker:", error);
      throw error;
    }
  }

  export async function deleteWorker(workerId) {
    try {
      await axios.delete(`${API_BASE_URL}/workers/${workerId}`);
    } catch (error) {
      console.error("Error deleting worker:", error);
      throw error;
    }
  }
  
  export async function addWorker(workerData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/workers`, workerData);
      return response.data;
    } catch (error) {
      console.error("Error adding worker:", error);
      throw error;
    }
  }
  