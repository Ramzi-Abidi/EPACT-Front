import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { createOrder } from '../actions/productAction';
import { ORDER_CREATE_RESET } from '../constants/productConstant';
import { cartReducer } from '../reducers/cartReducers';
import AnimatedPage from './AnimatedPage';
import CheckoutSteps from './CheckoutSteps'
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import "./placeOrder.css";


const PlaceOrder = () => {

  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!JSON.parse(localStorage.getItem("shippingAddress")))
    history.push("/cart");

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  /* cart.taxPrice = toPrice(0.15 * cart.itemsPrice); */
  cart.totalPrice = cart.itemsPrice; //+ cart.taxPrice;

  const placeOrderHandler = () => {
    // TODO: dispatch place order action
    // let fullName = JSON.parse(localStorage.getItem("userInfo")).fullName;
    let email = JSON.parse(localStorage.getItem("userInfo")).email;
    let numTel = JSON.parse(localStorage.getItem("shippingAddress")).numTel;

    dispatch(createOrder({ ...cart, orderItems: cart.cartItems, email, numTel }));
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo"))) {
      history.push("/signin");
    }

    if (success) {
      swal("Envoyée!", "La commande est envoyée avec succès", "success");
      history.push("/");

      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, history, success]);

  return (
    <AnimatedPage>

    <div style={{ marginTop: "7.5rem" }}>

      <div clasName="container">
        <CheckoutSteps step1="active" step2="active" step3="active" />
        <div className='row-top' style={{ display: "flex", margin: "1rem auto", justifyContent: "center", alignItems: "center" }}>
          <div className='col-2' style={{ width: "65%" }}>
            <ul style={{ padding: "1.5rem" }}>
              <li>
                <div className='card card-body'>
                  <h2>Expédition</h2>
                  <p>
                    <strong>Nom : </strong>
                    {cart.shippingAddress.fullName} <br />
                    <strong>Adresse : </strong> {cart.shippingAddress.address},{" "}
                    {/* {cart.shippingAddress.postalCode},{" "} */}
                    {cart.shippingAddress.country} <br />

                    <strong>Num Tel : </strong>
                    {cart.shippingAddress.numTel}
                  </p>
                </div>
              </li>

              <li>
                <div className='card card-body'>
                  <h2>Paiement</h2>
                  <p>
                    <strong>Methode de paiement : </strong> Cash
                  </p>
                </div>
              </li>

              <li>
                <div className='card card-body'>
                  <h2>Order items</h2>

                  <ul >
                    {cart.cartItems.map((item) => (
                      <li key={item._id}>
                        <div className="row">
                          <div>
                            <img
                              src={`http://102.219.178.49:5000/${item.image}`}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>

                          <div>{item.qty} * {item.price} dt = {item.qty * item.price}</div>
                          <div>

                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-1" style={{ height: "70%", marginTop: "3.5rem", alignSelf: "self-start", width: "35%", padding: "1.2rem" }}>
            <div className="card card-body">
              <ul style={{ margin: "0 auto", padding: "0" }}>
                <li>
                  <h2>Les détails de l'ordre : </h2>
                </li>
                <li>
                  <div className="" style={{ display: "flex", justifyContent: "space-between", margin: "1.2rem 0" }}>
                    <strong>Items : </strong>
                    <div>{cart.itemsPrice.toFixed(2)} dt</div>
                  </div>
                </li>

                <li>
                  <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <strong> Prix Total : {' '} </strong>
                    </div>
                    <div>
                      <strong> {cart.totalPrice.toFixed(2)} dt </strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    style={{ width: "100%", height: "42px", marginTop: "1.5rem", background: "#049A5B", border: "none", color: "#fff", fontSize: "15px" }}
                    type="button"
                    onClick={placeOrderHandler}
                    className="primary block btn"
                    disabled={cart.cartItems.length === 0}
                  >
                    Passer la commande
                  </button>
                </li>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">une erreur s'est produite, veuillez réessayer plus tard</MessageBox>}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
    </AnimatedPage>

  )
}

export default PlaceOrder;