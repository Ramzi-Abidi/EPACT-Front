//second page:
// Action creators : houma e slaves(fcts) ely el UI yaatehom l'order, w houma yaato lel piegons el letters(fehe hajtyn action,payload).

import { ADD_TO_CART, CART_EMPTY, CART_REMOVE, CART_SAVE_SHIPPING_ADDRESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_MINE_LIST_REQUEST, PRODUCT_DEFAULT_FAIL, PRODUCT_DEFAULT_REQUEST, PRODUCT_DEFAULT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/productConstant"
import Axios from "axios";


/* export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}; */

//first slave (fct)
export const listProducts = () => async (dispatch) => {
    dispatch({                  //dispatch hiya el pigeon (7mema) wl object ly f wost'ha hiya el letter ely bch t'hezha lel banker(reducer) .
        type: PRODUCT_LIST_REQUEST,
    });

    try {
        const response = await fetch("http://102.219.178.49:5000/api/products");
        const data = await response.json();
        console.log(data);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message,
        });
    }
}

//second slave :  yekhedh el id taa el product bch ynjm yaatyh lel banker wl banker yzido f store ("productDetails" state) .
export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DEFAULT_REQUEST,
        payload: productId,
    });

    try {
        console.log(productId);
        const response = await fetch(`http://102.219.178.49:5000/api/products/${productId}`);
        const singleProd = await response.json();
        console.log(singleProd);

        dispatch({
            type: PRODUCT_DEFAULT_SUCCESS,
            payload: singleProd,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DEFAULT_FAIL,
            payload: error.message,
        });
    }
}

//third slave : (ely yaaty pigeon el letter) .
export const addToCart = (productId, qty) => async (dispatch, getState) => {
    console.log(productId);

    const response = await fetch(`http://102.219.178.49:5000/api/products/${productId}`);
    const data = await response.json();
    console.log(data);


    dispatch({
        type: ADD_TO_CART,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            product: data._id,
            qty: qty
        }
    });

    //adding product to locastorage .


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE,
        payload: productId
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

//save shipping address :
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};


//user actions :
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('http://102.219.178.49:5000/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('http://102.219.178.49:5000/api/users/register', {
            name,
            email,
            password,
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

/* export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({ type: USER_SIGNOUT });
}; */

//order actions :
export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//user action :
export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
};

//user updating action:
export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`http://102.219.178.49:5000/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
};


/*  export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};  */