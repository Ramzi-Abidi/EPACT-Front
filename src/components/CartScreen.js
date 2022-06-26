//UI is the king  

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, listProducts, removeFromCart } from '../actions/productAction';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MessageBox from './MessageBox';
import AnimatedPage from './AnimatedPage';

const CartScreen = (props) => {

    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector((state) => state.cart);
    const history = useHistory();

    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("userInfo"))) {
            history.push("/signin");
        }


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
        <AnimatedPage>

            <div style={{ marginTop: "5.5rem", height: "60vh", padding: "0 3rem" }}>
                <div className="row top" style={{ marginTop: "9rem" }}>
                    <div className="col-2">
                        <h1 style={{ marginBottom: "1.5rem" }}>Panier</h1>
                        {cartItems.length === 0 ? (
                            <MessageBox>
                                Le panier est vide. <Link to="/" style={{ color: "#2780e3" }}>Go Shopping</Link>
                            </MessageBox>
                        ) : (
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item._id}>
                                        <div className="row">
                                            <div>
                                                <img
                                                    src={`http://102.219.178.49:5000/${item.image}`}
                                                    alt={item.name}
                                                    className="small"
                                                ></img>
                                            </div>
                                            <div className="" style={{ margin: "0 2rem" }}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className=''>

                                                <div class="form-group" style={{ margin: "0 2rem" }}>

                                                    <input type="number"
                                                        className="input-number"
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                addToCart(item.product, Number(e.target.value))
                                                            )
                                                        }
                                                        min={1}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    style={{ background: "rgb(247 37 21)", fontSize: "15px", margin: "0.5rem", color: "#fff", border: "none", padding: ".6rem" }}
                                                    type="button"
                                                    className='btn btn-warning customized-btn'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    Supprimer
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
                                <h2>
                                    total ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} produits) : {' '}
                                    {
                                        cartItems.reduce((a, c) => Number(a) + Number(c.price) * Number(c.qty), 0)
                                    }
                                    dt
                                </h2>
                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    className="btn btn-outline-warning customized-btn"
                                    style={{ background: "#049A5B", border: "none", color: "#fff", fontSize: "15px", padding: ".6rem" }}
                                    disabled={cartItems.length === 0}
                                >
                                    Passer à la caisse
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </AnimatedPage>

    )
}

export default CartScreen;