import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import certificatService from './certificatService'

const initialState = {
  certificats: [],
  certificat: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// Get all certificats
export const getCertificats = createAsyncThunk(
  'certificat/getAll',
  async (_, thunkAPI) => {
    try {
      return await certificatService.getCertificats()
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
export const getCertificat = createAsyncThunk(
  'certificat/get',
  async (certificatId, thunkAPI) => {
    try {
      return await certificatService.getWaste(certificatId)
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

export const certificatSlice = createSlice({
  name: 'certificat',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getCertificats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCertificats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.certificats = action.payload
      })
      .addCase(getCertificats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.certificats = null
      })
     
      .addCase(getCertificat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCertificat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.certificat = action.payload
      })
      .addCase(getCertificat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.certificat = null
      })

  
  },
})

export const { reset } = certificatSlice.actions
export default certificatSlice.reducer