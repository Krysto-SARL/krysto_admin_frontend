import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectService from './collectService'

const initialState = {
  collects: [],
  collect: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// Get all collects
export const getCollects = createAsyncThunk(
  'collects/getAll',
  async (_, thunkAPI) => {
    try {
      return await collectService.getCollects()
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
export const getCollect = createAsyncThunk(
  'collects/get',
  async (collectId, thunkAPI) => {
    try {
      return await collectService.getCollect(collectId)
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


export const collectSlice = createSlice({
  name: 'collect',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getCollects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collects = action.payload
      })
      .addCase(getCollects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.collects = null
      })
     
      .addCase(getCollect.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollect.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collect = action.payload
      })
      .addCase(getCollect.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.collect = null
      })
     
     
     
     
    

  
  },
})

export const { reset } = collectSlice.actions
export default collectSlice.reducer