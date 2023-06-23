import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import initiationService from './initiationService'

const initialState = {
  services: [],
  service: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getServices = createAsyncThunk(
  'service/getAll',
  async (_, thunkAPI) => {
    try {
      return await initiationService.getServices()
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

export const getService = createAsyncThunk(
  'service/get',
  async (serviceId, thunkAPI) => {
    try {
      return await initiationService.getService(serviceId)
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

export const createService = createAsyncThunk(
  'service/create',
  async (serviceData, thunkAPI) => {
    try {
      return await initiationService.createService(
        serviceData,
        serviceData.categoryId,
      )
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

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.services = action.payload
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.services = []
      })
      .addCase(getService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.service = action.payload
      })
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.service = {}
      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.products avec le nouveau produit créé si nécessaire
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer
