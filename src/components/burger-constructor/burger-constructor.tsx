import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { userDataSelector } from '../../services/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrderData,
  fetchOrder,
  getOrderData,
  getOrderRequest
} from '../../services/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.constructor) || {
    bun: null,
    ingredients: []
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientDataId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(fetchOrder(ingredientDataId));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = (constructorItems.ingredients || []).reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
