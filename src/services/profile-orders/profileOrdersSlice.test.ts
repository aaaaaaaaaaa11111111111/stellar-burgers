import { error } from 'console';
import profileOrdersReducer, { initialState } from './profileOrdersSlice';
import { getProfileOrder } from './profileOrdersSlice';

describe('profileOrdersSlice', () => {
  const mockData = [
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
  ];

  it('должен вернуть начальное состояние при инициализации', () => {
    const result = profileOrdersReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать getProfileOrder.pending', () => {
    const action = { type: getProfileOrder.pending.type };
    const result = profileOrdersReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать getProfileOrder.fulfilled', () => {
    const action = { type: getProfileOrder.fulfilled.type, payload: mockData};
    const result = profileOrdersReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(mockData);
  });

  it('', () => {
    const action = { type: getProfileOrder.rejected.type, error: { message: 'Ошибка загрузки заказов' } };
    const result = profileOrdersReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки заказов');
  });
});
