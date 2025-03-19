import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientID = useParams().id;
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientID
  );

  // const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
