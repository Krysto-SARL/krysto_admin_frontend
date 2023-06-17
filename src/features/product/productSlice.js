import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getProducts = createAsyncThunk(
  'product/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts()
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

export const getproduct = createAsyncThunk(
  'product/get',
  async (productId, thunkAPI) => {
    try {
      return await productService.getOrder(productId)
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.products = []
      })
      .addCase(getproduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getproduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.product = {}
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice.reducer
