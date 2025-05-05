import { error } from 'console';
import feedReducer, { initialState } from './feedSlice';
import { getFeed } from './feedSlice';

describe('feedSlice', () => {
  const mockData = {
    orders: [
      {
        createdAt: '2025-04-25T05:59:47.829Z',
        ingredients: ['ingredient1', 'ingredient2', 'ingredient1'],
        name: 'nameOrder',
        number: 75630,
        price: 2964,
        status: 'done',
        updatedAt: '2025-04-25T05:59:48.551Z',
        _id: '680b24d3e8e61d001cec4748'
      }
    ],
    total: 1500,
    totalToday: 100
  };

  it('должен вернуть начальное состояние при инициализации', () => {
    const result = feedReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать getFeed.pending', () => {
    const action = { type: getFeed.pending.type };
    const result = feedReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать getFeed.fulfilled', () => {
    const action = {type: getFeed.fulfilled.type, payload: mockData };
    const result = feedReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(mockData.orders);
    expect(result.total).toBe(mockData.total);
    expect(result.totalToday).toBe(mockData.totalToday);
  });

  it('должен обрабатывать getFeed.rejected', () => {
    const action = { type: getFeed.rejected.type, error: { message: 'Ошибка загрузки'} };
    const result = feedReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки');
  });
});
