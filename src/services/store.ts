import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userSlice from './user/userSlice';
import feedSlice from './feed/feedSlice';
import ingredientsSlice from './ingredients/ingredientsSlice';
import profileOrdersSlice from './profileOrders/profileOrdersSlice';
import orderSlice from './order/orderSlice';
import constructorSlice from './constructor/constructorSlice';

const rootReducer = combineReducers({
  user: userSlice,
  feed: feedSlice,
  ingredients: ingredientsSlice,
  profileOrders: profileOrdersSlice,
  order: orderSlice,
  constructor: constructorSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
