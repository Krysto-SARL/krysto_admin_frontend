import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const productURL = '/products'

const getProducts = async () => {
  const response = await axios.get(`${API_URL}${productURL}`)
  return response.data
}

const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}/${productURL}`)
  return response.data
}

const createProduct = async (productData, productCategoryId) => {
  const response = await axios.post(
    `${API_URL}/productCategories/${productCategoryId}${productURL}`,
    productData,
  )
  return response.data
}

const productService = {
  getProducts,
  getProduct,
  createProduct,
}

export default productService
