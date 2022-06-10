import { removeFromCart } from "../actions/productAction";
import { ADD_TO_CART, CART_EMPTY, CART_REMOVE, CART_SAVE_SHIPPING_ADDRESS } from "../constants/productConstant";


export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log(state);
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
          ...state, shippingAddress: action.payload
      }
      
    case CART_EMPTY:
      return { ...state, cartItems: [] };
  
    default:
      return state;
  }
};