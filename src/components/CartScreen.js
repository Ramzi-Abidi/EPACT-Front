//UI is the king  

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, listProducts, removeFromCart } from '../actions/productAction';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MessageBox from './MessageBox';

const CartScreen = (props) => {
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
    const history = useHistory() ;

    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.match.params.id) {
            dispatch(addToCart(props.match.params.id, qty));
        }
    }, [props.match.params.id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    };

    const checkoutHandler = () => {
        history.push('/shipping');
    };

    return (
        <div style={{marginTop:"5.5rem", height:"60vh", padding:"0 3rem"}}>
            <div className="row top" style={{marginTop:"9rem"}}>
                <div className="col-2">
                    <h1 style={{marginBottom:"1.5rem"}}>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div className="row">
                                        <div>
                                            <img
                                                src={`../images/${item.image}`}
                                                alt={item.name}
                                                className="small"
                                            ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >

                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </div>
                                        {/* <div>{item.price}dt</div> */}
                                        <div>
                                            <button
                                            style={{background:"#ff5722" , margin:"0.5rem", width:"60px", height:"30px"}}
                                                type="button"
                                                className='btn'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} produits) : 
                                    {
                                        cartItems.reduce((a, c) => Number(a) + Number(c.price) * Number(c.qty), 0)
                                    }
                                    dt
                                </h2>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    className="primary block btn"
                                    disabled={cartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CartScreen;