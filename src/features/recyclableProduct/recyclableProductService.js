import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const recyclableProductURL = '/recyclableProducts'

const getRecyclableProducts = async () => {
  const response = await axios.get(`${API_URL}${recyclableProductURL}`)
  return response.data
}

const getRecyclableProduct = async (recyclableProductId) => {
  const response = await axios.get(
    `${API_URL}${recyclableProductURL}/${recyclableProductId}`,
  )
  return response.data
}

const createRecyclableProduct = async (recyclableProductData) => {
  const response = await axios.post(
    `${API_URL}${recyclableProductURL}`,
    recyclableProductData,
  )
  return response.data
}

const updateRecyclableProduct = async (recyclableProductId, updatedData) => {
  const response = await axios.put(
    `${API_URL}${recyclableProductURL}/${recyclableProductId}`,
    updatedData,
  )
  return response.data
}

const deleteRecyclableProduct = async (recyclableProductId) => {
  const response = await axios.delete(
    `${API_URL}${recyclableProductURL}/${recyclableProductId}`,
  )
  return response.data
}

const addRecyclableProductPhoto = async (recyclableProductId, photoData) => {
  const response = await axios.put(
    `${API_URL}${recyclableProductURL}/${recyclableProductId}/photo`,
    photoData,
  )
  return response.data
}

const recyclableProductService = {
  getRecyclableProducts,
  getRecyclableProduct,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
  addRecyclableProductPhoto,
}

export default recyclableProductService
