import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recyclableProductCategoryService from './recyclableProductCategoryService'

const initialState = {
  recyclableProductCategories: [],
  recyclableProductCategory: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getRecyclableProductCategories = createAsyncThunk(
  'recyclableProductCategory/getRecyclableProductCategories',
  async (_, thunkAPI) => {
    try {
      return await recyclableProductCategoryService.getRecyclableProductCategories()
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

export const getRecyclableProductCategory = createAsyncThunk(
  'recyclableProductCategory/getRecyclableProductCategory',
  async (recyclableProductCategoryId, thunkAPI) => {
    try {
      return await recyclableProductCategoryService.getRecyclableProductCategory(
        recyclableProductCategoryId,
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

export const createRecyclableProductCategory = createAsyncThunk(
  'recyclableProductCategory/createRecyclableProductCategory',
  async (recyclableProductCategoryData, thunkAPI) => {
    try {
      return await recyclableProductCategoryService.createRecyclableProductCategory(
        recyclableProductCategoryData,
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

export const updateRecyclableProductCategory = createAsyncThunk(
  'recyclableProductCategory/updateRecyclableProductCategory',
  async ({ recyclableProductCategoryId, updatedData }, thunkAPI) => {
    try {
      return await recyclableProductCategoryService.updateRecyclableProductCategory(
        recyclableProductCategoryId,
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

export const deleteRecyclableProductCategory = createAsyncThunk(
  'recyclableProductCategory/deleteRecyclableProductCategory',
  async (recyclableProductCategoryId, thunkAPI) => {
    try {
      return await recyclableProductCategoryService.deleteRecyclableProductCategory(
        recyclableProductCategoryId,
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

export const recyclableProductCategorySlice = createSlice({
  name: 'recyclableProductCategory',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecyclableProductCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecyclableProductCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProductCategories = action.payload
      })
      .addCase(getRecyclableProductCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProductCategories = []
      })
      .addCase(getRecyclableProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecyclableProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProductCategory = action.payload
      })
      .addCase(getRecyclableProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProductCategory = {}
      })
      .addCase(createRecyclableProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecyclableProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Ajoutez la nouvelle catégorie de produits recyclables à state.recyclableProductCategories si nécessaire
      })
      .addCase(createRecyclableProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateRecyclableProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateRecyclableProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recyclableProductCategory = action.payload
      })
      .addCase(updateRecyclableProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.recyclableProductCategory = {}
      })
      .addCase(deleteRecyclableProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecyclableProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Supprimez la catégorie de produits recyclables de state.recyclableProductCategories si nécessaire
      })
      .addCase(deleteRecyclableProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = recyclableProductCategorySlice.actions
export default recyclableProductCategorySlice.reducer
