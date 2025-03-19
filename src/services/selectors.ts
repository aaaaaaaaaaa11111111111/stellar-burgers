import { RootState } from './store';

export const ordersInfoSelector =
  (number: string) => (state: RootState) => {
    if (state.feed.orders.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.profileOrders.orders.length) {
      const data = state.profileOrders.orders.find(
        (item) => item.number === +number
      );
      if (data) return data;
    }

    if (state.order.orderData) {
      return state.order.orderData;
    }

    return null;
  };
