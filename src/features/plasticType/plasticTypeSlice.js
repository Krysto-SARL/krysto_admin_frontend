import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import plasticTypeService from './plasticTypeService'

const initialState = {
  plasticTypes: [],
  plasticType: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPlasticTypes = createAsyncThunk(
  'initiation/getPlasticTypes',
  async (_, thunkAPI) => {
    try {
      return await plasticTypeService.getPlasticTypes()
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

export const getPlasticType = createAsyncThunk(
  'initiation/getPlasticType',
  async (serviceId, thunkAPI) => {
    try {
      return await plasticTypeService.getPlasticType(serviceId)
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

export const createPlasticType = createAsyncThunk(
  'initiation/createPlasticType',
  async (plasticTypeData, thunkAPI) => {
    try {
      return await plasticTypeService.createPlasticType(plasticTypeData)
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

export const plasticTypeSlice = createSlice({
  name: 'initiation',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlasticTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlasticTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticTypes = action.payload
      })
      .addCase(getPlasticTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticTypes = []
      })
      .addCase(getPlasticType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlasticType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticType = action.payload
      })
      .addCase(getPlasticType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticType = {}
      })
      .addCase(createPlasticType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPlasticType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.plasticTypes avec le nouveau type de plastique créé si nécessaire
      })
      .addCase(createPlasticType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = plasticTypeSlice.actions
export default plasticTypeSlice.reducer
