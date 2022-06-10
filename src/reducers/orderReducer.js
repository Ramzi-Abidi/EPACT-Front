import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS } from "../constants/productConstant";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

/*   export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_MINE_LIST_REQUEST:
        return { loading: true };
      case ORDER_MINE_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }; */