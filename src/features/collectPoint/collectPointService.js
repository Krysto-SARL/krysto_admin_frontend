import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/collectPoints'

const getCollectPoints = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getCollectPoint = async (collectPointId) => {
  const response = await axios.get(`${API_URL}/${collectPointId}`)
  return response.data
}
const createNewCollect = async (collectPointId) => {
  const response = await axios.post(`${API_URL}/${collectPointId}/collects`)
  return response.data
}
const createNewCollectPoint = async () => {
  const response = await axios.post(`${API_URL}`)
  return response.data
}



const collectPointService = {
  getCollectPoints,
  getCollectPoint,
  createNewCollect,
  createNewCollectPoint,
}

export default collectPointService