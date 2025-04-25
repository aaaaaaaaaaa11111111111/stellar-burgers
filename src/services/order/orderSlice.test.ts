import orderReducer, {
  clearOrderData,
  fetchOrder,
  getOrderByNumber,
  initialState
} from './orderSlice';

describe('orderSlice', () => {
  const mockData = {
    createdAt: '2025-04-25T05:59:47.829Z',
    ingredients: ['ingredient1', 'ingredient2', 'ingredient1'],
    name: 'nameOrder',
    number: 75630,
    price: 2964,
    status: 'done',
    updatedAt: '2025-04-25T05:59:48.551Z',
    _id: '680b24d3e8e61d001cec4748'
  };

  it('должен вернуть начальное состояние при инициализации', () => {
    const result = orderReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('обрабатывает fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const result = orderReducer(initialState, action);
    expect(result.orderRequest).toBe(true);
  });

  it('обрабатывает fetchOrder.fullfilled', () => {
    const action = { type: fetchOrder.fulfilled.type, payload: mockData };
    const result = orderReducer(initialState, action);
    expect(result.orderData).toEqual(mockData);
    expect(result.orderRequest).toEqual(false);
  });

  it('обрабатывает fetchOrder.reject', () => {
    const action = { type: fetchOrder.rejected.type };
    const result = orderReducer(initialState, action);
    expect(result.orderRequest).toBe(false);
    expect(result.orderData).toBeNull();
  });

  it('обрабатывает getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = orderReducer(initialState, action);
    expect(result.orderRequest).toBe(true);
  });

  it('обрабатывает getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockData] }
    };
    const result = orderReducer(initialState, action);
    expect(result.orderData).toEqual(mockData);
    expect(result.orderRequest).toBe(false);
  });

  it('обрабатывает getOrderByNumber.rejected', () => {
    const action = { type: getOrderByNumber.rejected.type };
    const result = orderReducer(initialState, action);
    expect(result.orderRequest).toBe(false);
  });

  it('обрабатывает clearOrderData', () => {
    const stateWithOrder = { orderData: mockData, orderRequest: false };
    const result = orderReducer(stateWithOrder, clearOrderData());
    expect(result.orderData).toBeNull();
  });
});
