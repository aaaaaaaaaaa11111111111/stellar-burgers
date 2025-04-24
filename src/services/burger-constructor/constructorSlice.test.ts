import constructorReducer, {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  initialState
} from './сonstructorSlice';

const bun = {
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
  };
  
  const mainIngredient = {
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
  };

  describe('constructorSlice', () => {
    it('должен обрабатывать addIngredient для булки', () => {
        const state = constructorReducer(initialState, addIngredient(bun));
        expect(state.bun?._id).toBe('bun123');
    });

    it('должен обрабатывать addIngredient для начинки', () => {
        const state = constructorReducer(initialState, addIngredient(mainIngredient));
        expect(state.ingredients.length).toBe(1);
        expect(state.ingredients[0]._id).toBe('main123');
        expect(state.ingredientsCounts['main123']).toBe(1);
    });

    it('должен обрабатывать deleteIngredient', () => {
      const added = constructorReducer(initialState, addIngredient(mainIngredient));
      const id = added.ingredients[0].id;
      const state = constructorReducer(added, deleteIngredient(id))
      expect(state.ingredients.length).toBe(0);
      expect(state.ingredientsCounts['main123']).toBeUndefined();
    });

    it('должен обрабатывать moveIngredientUp', () => {
      const first = { ...mainIngredient, id: '1' };
      const second = { ...mainIngredient, id: '2' };
      const state = {
        ...initialState,
        ingredients: [first, second],
        ingredientCounts: { 'main123': 2 }
      };
      const newState = constructorReducer(state, moveIngredientUp('2'));
      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('1');
    });

    it('должен обрабатывать moveIngredientDown', () => {
      const first = { ...mainIngredient, id: '1' };
      const second = { ...mainIngredient, id: '2' };
      const state = {
        ...initialState,
        ingredients: [first, second],
        ingredientCounts: { 'main123': 2 }
      };
      const newState = constructorReducer(state, moveIngredientDown('1'));
      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('1');
    });

    it('clearConstructor', () => {
      const stateWithIngredients = {
        bun,
        ingredients: [
          { ...mainIngredient, id: '1' },
          { ...mainIngredient, id: '2' }
        ],
        ingredientsCounts: { 'main123': 2 }
      };
      const newState = constructorReducer(stateWithIngredients, clearConstructor());
      expect(newState.bun).toBeNull();
      expect(newState.ingredients.length).toBe(0);
      expect(newState.ingredientsCounts).toEqual({});
    });
  });