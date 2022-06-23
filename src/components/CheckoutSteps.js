import React from 'react';
import signinLogo from "../images/5172973_arrow_entrance_in_internet_log_icon.png";
import shippingLogo from "../images/5736344_card_credit_debit_ecommerce_money_icon.png";

const CheckoutSteps = (props) => {
    console.log(props);
    return (
    <div className="row checkout-steps" style={{position: "relative",transform: "translateX(-50%)",left: "50%",margin:"2rem 0" , marginBottom:"3rem",width:"76%"}}>
        <div className={props.step1 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}> Sign-In  </div>
        <div className={props.step2 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Shipping  </div>
        <div className={props.step3 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Place Order</div>
  </div>
  )
}

export default CheckoutSteps