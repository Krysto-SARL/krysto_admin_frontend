import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wasteService from './wasteService'

const initialState = {
  wastes: [],
  waste: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// Get all wastes
export const getWastes = createAsyncThunk(
  'waste/getAll',
  async (_, thunkAPI) => {
    try {
      return await wasteService.getWastes()
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
export const getWaste = createAsyncThunk(
  'waste/get',
  async (wasteId, thunkAPI) => {
    try {
      return await wasteService.getWaste(wasteId)
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



// create new waste
export const createWaste = createAsyncThunk(
  'waste/createWaste',
  async (wasteData, thunkAPI) => {
    try {
      return await wasteService.createWaste(wasteData)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)




export const wasteSlice = createSlice({
  name: 'waste',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getWastes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWastes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wastes = action.payload
      })
      .addCase(getWastes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.wastes = null
      })
     
      .addCase(getWaste.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWaste.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.waste = action.payload
      })
      .addCase(getWaste.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.waste = null
      })
      .addCase(createWaste.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWaste.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

      })
      .addCase(createWaste.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  
  },
})

export const { reset } = wasteSlice.actions
export default wasteSlice.reducer