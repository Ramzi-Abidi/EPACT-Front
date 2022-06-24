import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signin } from '../actions/productAction';
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo)
      history.push("/");
  }, [userInfo]);

  return (
    <div className='holder'>
      <div class="background-container" style={{ background: "rgba(247, 247, 247, 0.95)" }}>
      </div>
      <span class="big-circle"></span>
      <div class="form" style={{ minHeight: "400px", top: "42.6%" }} onSubmit={handleSubmit}>
        <div class="contact-info">
          <h3 class="title" style={{ marginBottom: "40px" }}>Connectez-vous à votre compte</h3>

          <div class="info">
            <div class="information">
              <p><strong style={{ marginRight: "2.4rem" }}> Email : </strong> <a href="mailto:siwarbenkraeim1@gmail.com">siwarbenkraeim1@gmail.com</a></p>

            </div>
            <div class="information">
              <p> <strong style={{ marginRight: "1rem" }}>Num tel : </strong><b> 52070045</b></p>
            </div>
          </div>

          <div class="social-media">
            <p> Connectez avec nous : </p>
            <div class="social-icons">

              <a href="https://www.facebook.com/EPACTTunsie/" target={"_blank"}><i class="fab fa-facebook-f">  </i></a>
              <Link to="#">
                <i class="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>

        <div class="contact-form">

          <span class="circle one"></span>
          <span class="circle two"></span>

          <form autoComplete="on" style={{ position: "relative", height: "100%" }}>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant={"danger"}> {error} </MessageBox>}
            <h3 class="title" style={{ color: "#fff" }}>Sign in</h3>

            <div class="input-container">
              <input type="email" name="email" class="input" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
              <span>Email</span>
            </div>
            <div class="input-container">
              <input type="password" name="password" class="input" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} required minLength={6} maxLength={15} />
              <span>password</span>
            </div>
            <div className='input-container1' style={{ bottom: "9rem" }}>
              <input type="submit" value="Se connecter" class="btn btn-outline-primary signup" style={{ width: "11rem", height: "40px" }} />
              <div style={{color:"#fff"}}>
                Nouveau client ? <Link to="/signup"> Créez un nouveau compte </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin;