import cartReducer from '../../../redux/cartReducer';

test('adds item to cart', () => {
  const state = [];
  const action = {
    type: 'ADD_TO_CART',
    payload: { id: 1, name: 'Product' },
  };

  const newState = cartReducer(state, action);
  expect(newState).toHaveLength(1);
  expect(newState[0]).toEqual(action.payload);
}).toBeTruthy();