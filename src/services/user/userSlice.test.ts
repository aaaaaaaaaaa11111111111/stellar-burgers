import exp from 'constants';
import userReducer, { initialState, checkUserStatus } from './userSlice';
import {
  loginUser,
  registerUser,
  updateUser,
  getUser,
  logoutUser
} from './userSlice';

describe('userSlice', () => {
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const authResponse = {
    user: mockUser,
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  };

  const userResponse = {
    user: mockUser
  };

  it('должен вернуть начальное состояние при инициализации', () => {
    const result = userReducer(initialState, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('должен обрабатывать checkUserStatus', () => {
    const result = userReducer(initialState, checkUserStatus());
    expect(result.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: authResponse };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, error: { message: 'Ошибка входа' } };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка входа');
    expect(result.isAuthChecked).toBe(false);
  });

  it('должен обрабатывать registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: authResponse };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать registerUser.rejected', () => {
    const action = { type: registerUser.rejected.type, error: { message: 'Ошибка регистрации' } };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка регистрации');
  });

  it('должен обрабатывать updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен обрабатывать updateUser.fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: userResponse };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
  });

  it('должен обрабатывать updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type, error: { message: 'Ошибка обновления' } };
    const result = userReducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка обновления');
  });
});
