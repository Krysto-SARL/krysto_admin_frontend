import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const serviceURL = '/services'

const getServices = async () => {
  const response = await axios.get(`${API_URL}${serviceURL}`)
  return response.data
}

const getService = async (serviceId) => {
  const response = await axios.get(`${API_URL}${serviceURL}/${serviceId}`)
  return response.data
}

const createService = async (serviceData, serviceCategoryId) => {
  const response = await axios.post(
    `${API_URL}/serviceCategories/${serviceCategoryId}${serviceURL}`,
    serviceData,
  )
  return response.data
}

const initiationService = {
  getServices,
  getService,
  createService,
}

export default initiationService
