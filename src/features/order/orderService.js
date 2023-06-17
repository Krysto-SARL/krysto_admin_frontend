import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/orders'

const getOrders = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getOrder = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`)
  return response.data
}

const orderService = {
  getOrders,
  getOrder,
}

export default orderService
