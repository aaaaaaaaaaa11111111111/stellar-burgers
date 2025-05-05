import { rootReducer } from './store';
import { initialState as constructorInitialState } from './burger-constructor/сonstructorSlice';
import { initialState as feedInitialState } from './feed/feedSlice';
import { initialState as ingredientsInitialState } from './ingredients/ingredientsSlice';
import { initialState as orderInitaialState } from './order/orderSlice';
import { initialState as profileOrdersInitialState } from './profile-orders/profileOrdersSlice';
import { initialState as userInitialState } from './user/userSlice';

describe('rootReducer', () => {
    it('должен возвращять правильное начальное состояние', () => {
        const state = rootReducer(undefined, { type: '@@INIT' });

        expect(state.burgerConstructor).toEqual(constructorInitialState);
        expect(state.feed).toEqual(feedInitialState);
        expect(state.ingredients).toEqual(ingredientsInitialState);
        expect(state.order).toEqual(orderInitaialState);
        expect(state.profileOrders).toEqual(profileOrdersInitialState);
        expect(state.user).toEqual(userInitialState);
    });
});