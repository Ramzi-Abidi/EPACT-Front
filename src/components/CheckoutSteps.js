import React from 'react'

const CheckoutSteps = (props) => {
    console.log(props);
    return (
    <div className="row checkout-steps" style={{position: "relative",transform: "translateX(-50%)",left: "51%"}}>
        <div className={props.step1 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}> Sign-In</div>
        <div className={props.step2 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Shipping</div>
        <div className={props.step3 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Place Order</div>
  </div>
  )
}

export default CheckoutSteps