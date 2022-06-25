import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveShippingAddress } from '../actions/productAction';
import AnimatedPage from './AnimatedPage';
import CheckoutSteps from './CheckoutSteps';

const ShippinngAdress = () => {
  const history = useHistory();

  //Stopping user from going to shipping route 
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartItems")).length === 0) {
      history.push("/");
    }
  }, []);

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  if (!userInfo) {
    history.push("/signin");
  }


  const shippingInfos = JSON.parse(localStorage.getItem("shippingAddress"));

  console.log(shippingInfos);

  const [address, setAddress] = useState(shippingInfos ? shippingInfos.address : "");
  const [fullName, setFullName] = useState(shippingInfos ? shippingInfos.fullName : "");
  const [city, setCity] = useState(shippingInfos ? shippingInfos.city : "");
  const [postalCode, setPostalCode] = useState(shippingInfos ? shippingInfos.postalCode : "");
  const [country, setCountry] = useState(shippingInfos ? shippingInfos.country : "");
  const [numTel, setNumTel] = useState(shippingInfos ? shippingInfos.numTel : "");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO : dispatch save shipping address
    dispatch(saveShippingAddress({ fullName, address, city, postalCode, country, numTel }));

    history.push("/placeOrder");
  };

  return (
    <AnimatedPage>

    <div style={{ marginTop: "2rem" , padding:"4rem 0"}}>
      <CheckoutSteps step1="active" step2="active" />
      <div class="contact-form" style={{ margin:"1rem auto",width:"75%"}}>
        <span class="circle two"></span>

        <form autocomplete="on" onSubmit={handleSubmit}>
          <h3 class="title" style={{color:"#fff"}}>Shipping Address</h3>
          <div class="input-container">
            <input type="text" name="fullName" class="input" placeholder='Nom et prénom :' value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div class="input-container">
            <input type="text" name="address" class="input" placeholder='Addresse :' value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div class="input-container">
            <input type="text" class="input" placeholder='Numèro de Tel :' value={numTel} onChange={(e) => setNumTel(e.target.value)} required minLength={8} maxLength={8}/>
        
          </div>
  
          <div class="input-container textarea">
            <input name="postalCode" class="input" placeholder='Code Postale :' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            
          </div>
          <div class="input-container textarea">
            <input name="country" class="input" placeholder='Ville :' value={country} onChange={(e) => setCountry(e.target.value)} required />
        
          </div>
          <input type="submit" value="Continuer" style={{ width: "100%" }} className="randomBtn" />
        </form>
      </div>
    </div>
    </AnimatedPage>

  )
}

export default ShippinngAdress;