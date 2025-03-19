import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

interface IIngredient {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IIngredient = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredient/get', async () => {
  const response = await getIngredientsApi();
  return response;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        (state.isLoading = false), (state.ingredients = action.payload);
      })
      .addCase(getIngredients.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error = action.error.message as string);
      });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
