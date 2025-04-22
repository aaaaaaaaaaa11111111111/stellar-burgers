import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

interface IProfileOrder {
  orders: TOrder[];
  isLoading: boolean;
  error: null | string;
}

export const initialState: IProfileOrder = {
  orders: [],
  isLoading: false,
  error: null
};

export const getProfileOrder = createAsyncThunk(
  'profileOrder/getOrders',
  getOrdersApi
);

const profileOrdersSlice = createSlice({
  name: 'profileOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getProfileOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default profileOrdersSlice.reducer;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectIsProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;
