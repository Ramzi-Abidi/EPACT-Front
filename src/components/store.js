//first page : the store : houwa el bank account ely lking yheb yzyyd fyh coins .

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productDetailReducer, productListReducer } from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from "../reducers/userReducer";
import { orderCreateReducer } from "../reducers/orderReducer";


const initState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
    }


};

//el store te3na(the whole state) 3ibara 3la properties taa object maabynhom el reducers b des resultats .
const reducers = combineReducers({           //reducers is the store itself (the whole state). 
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate: orderCreateReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

const store = createStore(reducers, initState, compose(applyMiddleware(thunk)));

export default store;