import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/order/orderSlice';
import { selectIngredients } from '../../services/ingredients/ingredientsSlice';
import { ordersInfoSelector } from '@selectors';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const number = useParams().number || '';

  const orderData = useSelector(ordersInfoSelector(number));

  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(+number));
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      {!window.history.state?.usr?.background && (
        <div style={{ textAlign: 'center' }}>
          <h2 className='text text_type_main-medium pt-10'>
            #{orderInfo.number}
          </h2>
        </div>
      )}
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
