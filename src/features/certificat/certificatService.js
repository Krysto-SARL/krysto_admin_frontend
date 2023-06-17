import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/certificats'

const getCertificats = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getCertificat = async (certificatId) => {
  const response = await axios.get(`${API_URL}/${certificatId}`)
  return response.data
}



const certificatService = {
  getCertificats,
  getCertificat,
}

export default certificatService