import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/products'

const getProducts = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getProduct = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`)
  return response.data
}

const productService = {
  getProducts,
  getProduct,
}

export default productService
