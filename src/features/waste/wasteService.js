import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/wastes'

const getWastes = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getWaste = async (wasteId) => {
  const response = await axios.get(`${API_URL}/${wasteId}`)
  return response.data
}

const createWaste = async (wasteData) => {

  const response = await axios.post(API_URL, wasteData)
  return response.data
}


const wasteService = {
  getWastes,
  getWaste,
  createWaste
}


export default wasteService