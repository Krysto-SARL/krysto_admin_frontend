import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  orders: [],
  order: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all certificats
export const getOrders = createAsyncThunk(
  'order/getAll',
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getOrder = createAsyncThunk(
  'order/get',
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getOrder(orderId) // Correction: Utilisez getOrder au lieu de getWaste
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.orders = []
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.order = {}
      })
  },
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
