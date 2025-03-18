import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

interface IConstructor {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  ingredientsCounts: { [id: string]: number };
}

const initialState: IConstructor = {
  bun: null,
  ingredients: [],
  ingredientsCounts: {}
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
          state.ingredientsCounts[action.payload._id] =
            (state.ingredientsCounts[action.payload._id] || 0) + 1;
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== idToDelete
      );
      if (state.ingredientsCounts[idToDelete]) {
        state.ingredientsCounts[idToDelete] -= 1;
        if (state.ingredientsCounts[idToDelete] <= 0) {
          delete state.ingredientsCounts[idToDelete];
        }
      }
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index > 0) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredientToMove);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        const ingredientToMove = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredientToMove);
      }
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.ingredientsCounts = {};
    }
  }
});

export const selectConstructorItems = (state: RootState) => state.constructor;

export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
