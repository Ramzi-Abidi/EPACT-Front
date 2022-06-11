import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register, signin } from '../actions/productAction';
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";



const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      alert("confirm password are not matched");
    else
      dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo)
      history.push("/");

  }, [userInfo]);

  return (
    <div className='holder' >
      <div class="background-container" style={{ background: "#f1f1f1f1" }}>
        {/*     <div class="bg-1"></div>
            <div class="bg-2"></div> */}
      </div>

      <span class="big-circle"></span>
      <div class="form" style={{ minHeight: "288px" }} onSubmit={handleSubmit}>
        <div class="contact-info">
          <h3 class="title" style={{ marginBottom: "25px" }}>Créez votre compte</h3>

          <div class="info">
            <div class="information">
              <p>Le lieu</p>
            </div>
            <div class="information">
              <p>lorem@ipsum.com</p>
            </div>
            <div class="information">
              <p>123-456-789</p>
            </div>
          </div>

          <div class="social-media">
            <p>Connect with us :</p>
            <div class="social-icons">
              <Link to="#">
                <i class="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i class="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                <i class="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i class="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <span class="circle one"></span>
          <span class="circle two"></span>

          <form autoComplete="on">
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant={"danger"}> {error} </MessageBox>}
            <h3 class="title">Sign up</h3>

            <div class="input-container">
              <input type="text" name="name" class="input" placeholder='name' onChange={(e) => setName(e.target.value)} />
              <span>name</span>
            </div>
            <div class="input-container">
              <input type="email" name="email" class="input" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
              <span>Email</span>
            </div>
            <div class="input-container">
              <input type="password" name="password" class="input" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
              <span>password</span>
            </div>

            <div class="input-container">
              <input type="password" name="confirmPassword" class="input" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
              <span>Confirm Password</span>
            </div>

            <div className='input-container1'>
              <input type="submit" value="Send" class="btn" />
              <div>
                Vous avez déjà un compte ? <Link to="/signin"> Sign In </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;