import React from 'react';

const CheckoutSteps = (props) => {
    console.log(props);
    return (
    <div className="row checkout-steps" style={{position: "relative",transform: "translateX(-50%)",left: "50%",margin:"2rem 0" , marginBottom:"3rem",width:"76%"}}>
        <div className={props.step1 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}> Se connecter</div>
        <div className={props.step2 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>expédition</div>
        <div className={props.step3 ? 'activeStep' : ''} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Passer la commande</div>
  </div>
  )
}

export default CheckoutSteps