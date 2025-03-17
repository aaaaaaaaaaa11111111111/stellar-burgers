import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { RootState } from '../store';

interface IFeed extends TOrdersData {
  isLoading: boolean;
  error: null | string;
}

const initialState: IFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  // selectors: {
  //     feedOrdersSelector : (state) => state.orders,
  //     feedTotalSelector : (state) => state.total,
  //     feedTotalTodaySelector : (state) => state.totalToday,
  //     feedIsLoadingSelector: (state) => state.isLoading,
  //     feedErrorSelector : (state) => state.error
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default feedSlice.reducer;

// export const { feedOrdersSelector, feedTotalSelector, feedTotalTodaySelector, feedIsLoadingSelector, feedErrorSelector } =
//   feedSlice.selectors;

// export const feedOrdersSelector = (state: { feed: IFeed }) => state.feed.orders;
// export const feedTotalSelector = (state: { feed: IFeed }) => state.feed.total;
// export const feedTotalTodaySelector = (state: { feed: IFeed }) =>
//   state.feed.totalToday;
// export const feedIsLoadingSelector = (state: { feed: IFeed }) =>
//   state.feed.isLoading;
// export const feedErrorSelector = (state: { feed: IFeed }) => state.feed.error;

export const feedOrdersSelector = (state: RootState) => state.feed.orders;
export const feedTotalSelector = (state: RootState) => state.feed.total;
export const feedTotalTodaySelector = (state: RootState) =>
  state.feed.totalToday;
export const feedIsLoadingSelector = (state: RootState) => state.feed.isLoading;
export const feedErrorSelector = (state: RootState) => state.feed.error;
