import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { clearConstructor } from '../constructor/constructorSlice';

interface IOrder {
  orderData: TOrder | null;
  orderRequest: boolean;
}

const initialState: IOrder = {
  orderData: null,
  orderRequest: false
};

export const fetchOrder = createAsyncThunk(
  'orderData/createOrder',
  async (data: string[], { dispatch }) => {
    const response = await orderBurgerApi(data);
    if (response.success) {
      dispatch(clearConstructor());
    } else {
      throw new Error('Ошибка создания заказа');
    }
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

const orderSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    clearOrderModal(state) {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderRequest = false;
        state.orderData = payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export default orderSlice.reducer;
