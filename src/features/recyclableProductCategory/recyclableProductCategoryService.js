import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const recyclableProductCategoryURL = '/recyclableProductCategories'

const getRecyclableProductCategories = async () => {
  const response = await axios.get(`${API_URL}${recyclableProductCategoryURL}`)
  return response.data
}

const getRecyclableProductCategory = async (recyclableProductCategoryId) => {
  const response = await axios.get(
    `${API_URL}${recyclableProductCategoryURL}/${recyclableProductCategoryId}`,
  )
  return response.data
}

const createRecyclableProductCategory = async (
  recyclableProductCategoryData,
) => {
  const response = await axios.post(
    `${API_URL}${recyclableProductCategoryURL}`,
    recyclableProductCategoryData,
  )
  return response.data
}

const updateRecyclableProductCategory = async (
  recyclableProductCategoryId,
  updatedData,
) => {
  const response = await axios.put(
    `${API_URL}${recyclableProductCategoryURL}/${recyclableProductCategoryId}`,
    updatedData,
  )
  return response.data
}

const deleteRecyclableProductCategory = async (recyclableProductCategoryId) => {
  const response = await axios.delete(
    `${API_URL}${recyclableProductCategoryURL}/${recyclableProductCategoryId}`,
  )
  return response.data
}

const recyclableProductCategoryService = {
  getRecyclableProductCategories,
  getRecyclableProductCategory,
  createRecyclableProductCategory,
  updateRecyclableProductCategory,
  deleteRecyclableProductCategory,
}

export default recyclableProductCategoryService
