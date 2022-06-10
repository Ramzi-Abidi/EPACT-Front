//3rd page : bankers page


import { PRODUCT_DEFAULT_FAIL, PRODUCT_DEFAULT_REQUEST, PRODUCT_DEFAULT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, ADD_TO_CART } from "../constants/productConstant"

/* export const productListReducer = (state = { products: [] }, action) => {
    if (action.type === PRODUCT_LIST_REQUEST) {
        return {
            loading: true,
        };
    }
    else
        if (action.type === PRODUCT_LIST_SUCCESS) {
            return {
                loading: false,
                products: action.paylaod,
            };
        }
        else
            if (action.type === PRODUCT_LIST_FAIL) {
                return {
                    loading: false,
                    error: action.paylaod,
                }
            }
    else
        return state
}; */

//2cndbanker who's going to change the state in the store .
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const productDetailReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DEFAULT_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_DEFAULT_SUCCESS: {
            console.log(action);
            return {
                loading: false,
                product: action.payload,
            }
        }
        case PRODUCT_DEFAULT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

//3rd banker :
/* export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const existed = state.cartItems.find((x) => {
                return x.product === action.payload.product;
            })
            if (existed)
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => {
                        return x.product === existed.product ? action.payload : x
                    })
                }
            else {
                return {
                    cartItems: [...state.cartItems, action.payload],
                }
            }


        }
        default:
            return state;
    }
}*/

