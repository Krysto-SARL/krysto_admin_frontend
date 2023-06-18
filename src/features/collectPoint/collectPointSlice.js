import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectPointService from './collectPointService'

const initialState = {
  collectPoints: [],
  collectPoint: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getCollectPoints = createAsyncThunk(
  'collectPoints/getAll',
  async (_, thunkAPI) => {
    try {
      return await collectPointService.getCollectPoints()
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

export const getCollectPoint = createAsyncThunk(
  'collectPoints/get',
  async (collectPointId, thunkAPI) => {
    try {
      return await collectPointService.getCollectPoint(collectPointId)
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

export const createNewCollect = createAsyncThunk(
  'collectPoints/create',
  async (collectPointId, thunkAPI) => {
    try {
      return await collectPointService.createNewCollect(collectPointId)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createNewCollectPoint = createAsyncThunk(
  'collectPoints/createNew',
  async (_, thunkAPI) => {
    try {
      return await collectPointService.createNewCollectPoint()
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateCollectPointQRCode = createAsyncThunk(
  'collectPoints/updateQRCode',
  async ({ collectPointId, qrCodeFile }, thunkAPI) => {
    try {
      return await collectPointService.uploadQRCode(collectPointId, qrCodeFile)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const collectPointSlice = createSlice({
  name: 'collectPoint',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectPoints.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollectPoints.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectPoints = action.payload
      })
      .addCase(getCollectPoints.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.collectPoints = []
      })
      .addCase(getCollectPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollectPoint.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collectPoint = action.payload
      })
      .addCase(getCollectPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.collectPoint = {}
      })
      .addCase(createNewCollect.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewCollect.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createNewCollect.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNewCollectPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewCollectPoint.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createNewCollectPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCollectPointQRCode.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCollectPointQRCode.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateCollectPointQRCode.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = collectPointSlice.actions

export default collectPointSlice.reducer
