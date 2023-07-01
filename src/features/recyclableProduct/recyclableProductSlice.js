import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recyclableProductService from './recyclableProductService'

const initialState = {
  recyclableProducts: [],
  recyclableProduct: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getRecyclableProducts = createAsyncThunk(
  'recyclableProduct/getRecyclableProducts',
  async (_, thunkAPI) => {
    try {
      return await recyclableProductService.getRecyclableProducts()
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

export const getRecyclableProduct = createAsyncThunk(
  'recyclableProduct/getRecyclableProduct',
  async (recyclableProductId, thunkAPI) => {
    try {
      return await recyclableProductService.getRecyclableProduct(
        recyclableProductId,
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

export const createRecyclableProduct = createAsyncThunk(
  'recyclableProduct/createRecyclableProduct',
  async (recyclableProductData, thunkAPI) => {
    try {
      return await recyclableProductService.createRecyclableProduct(
        recyclableProductData,
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

export const updateRecyclableProduct = createAsyncThunk(
  'recyclableProduct/updateRecyclableProduct',
  async ({ recyclableProductId, updatedData }, thunkAPI) => {
    try {
      return await recyclableProductService.updateRecyclableProduct(
        recyclableProductId,
        updatedData,
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

export const deleteRecyclableProduct = createAsyncThunk(
  'recyclableProduct/deleteRecyclableProduct',
  async (recyclableProductId, thunkAPI) => {
    try {
      return await recyclableProductService.deleteRecyclableProduct(
        recyclableProductId,
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

export const addRecyclableProductPhoto = createAsyncThunk(
  'recyclableProduct/addRecyclableProductPhoto',
  async ({ recyclableProductId, photo }, thunkAPI) => {
    try {
      return await recyclableProductService.addRecyclableProductPhoto(
        recyclableProductId,
        photo,
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

export const recyclableProductSlice = createSlice({
  name: 'recyclableProduct',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecyclableProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecyclableProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProducts = action.payload
      })
      .addCase(getRecyclableProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProducts = []
      })
      .addCase(getRecyclableProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecyclableProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProduct = action.payload
      })
      .addCase(getRecyclableProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProduct = {}
      })
      .addCase(createRecyclableProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecyclableProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.plasticTypes avec le nouveau type de plastique créé si nécessaire
      })
      .addCase(createRecyclableProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateRecyclableProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRecyclableProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProduct = action.payload
      })
      .addCase(updateRecyclableProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProduct = {}
      })
      .addCase(deleteRecyclableProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecyclableProduct.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.recyclableProducts en supprimant le produit recyclable si nécessaire
      })
      .addCase(deleteRecyclableProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addRecyclableProductPhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addRecyclableProductPhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProduct = action.payload
      })
      .addCase(addRecyclableProductPhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProduct = {}
      })
  },
})

export const { reset } = recyclableProductSlice.actions
export default recyclableProductSlice.reducer
