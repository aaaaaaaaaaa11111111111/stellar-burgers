import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrder,
  selectProfileOrders
} from '../../services/profile-orders/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(getProfileOrder());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
