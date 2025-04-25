import ingredientsReducer, { initialState } from './ingredientsSlice';
import { getIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const mockData = [
    {
      _id: 'bun123',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 50,
      image: 'img1',
      image_mobile: 'img_large1',
      image_large: 'img_mobile1'
    },
    {
      _id: 'main123',
      name: 'Мясо',
      type: 'main',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'img2',
      image_mobile: 'img_large2',
      image_large: 'img_mobile2'
    }
  ];

  it('должен вернуть начальное состояние при инициализации', () => {
    const result = ingredientsReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });
});
