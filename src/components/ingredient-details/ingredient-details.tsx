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

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {!window.history.state?.usr?.background && (
          <h2 className='text text_type_main-medium pt-10'>
            Детали ингредиента
          </h2>
        )}
        <IngredientDetailsUI ingredientData={ingredientData} />
      </div>
    </>
  );
};
