import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/collects'

const getCollects = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getCollect = async (collectId) => {
  const response = await axios.get(`${API_URL}/${collectId}`)
  return response.data
}




const collectService = {
  getCollects,
  getCollect,
 
}

export default collectService