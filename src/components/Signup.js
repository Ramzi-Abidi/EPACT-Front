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
  const [expertDomain, setExpertDomain] = useState("");
  const [show, setShow] = useState(false);
  const [expertCheckBox, setExpertCheckBox] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      alert("confirm password are not matched");
    else
      dispatch(register(name, email, password, expertCheckBox, expertDomain));
  };

  const handleExpert = (ch) => {
    setShow(!show);
    setExpertCheckBox(ch);
  }

  useEffect(() => {
    if (userInfo)
      history.push("/");

  }, [userInfo]);

  return (
    <div className='holder' >
      <div class="background-container" style={{ background: "#f1f1f1f1" }}>
      </div>

      <span class="big-circle"></span>
      <div class="form" style={{ minHeight: "288px" }} onSubmit={handleSubmit}>
        <div class="contact-info">
          <h3 class="title" style={{ marginBottom: "25px" }}>Créez votre compte</h3>

          <div class="info">
            <div class="information">
              <p><strong style={{ marginRight: "2.4rem" }}> Email : </strong> <a href="mailto:epacttunisie@gmail.com">siwarbenkraeim1@gmail.com</a></p>

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

          <form autoComplete="on">
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant={"danger"}> Ce compte existe déjà </MessageBox>}
            <h3 class="title" style={{ color: "#fff" }}>Sign up</h3>

            <div class="input-container">
              <input type="text" class="input" placeholder="Nom d'utilisateur" onChange={(e) => setName(e.target.value)} minLength={5} />
              <span>Nom</span>
            </div>
            <div class="input-container">
              <input type="email" name="email" class="input" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
              <span>Email</span>
            </div>
            <div class="input-container">
              <input type="password" class="input" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={12} />
              <span>Mot de passe</span>
            </div>

            <div class="input-container">
              <input type="password" name="Confirmer password" class="input" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} maxLength={12}/>
              <span>Confirmer le mot de passe</span>
            </div>

            <div class="input-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "85%" }}>
              <legend class="mt-4">Etes-vous un expert ? </legend>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" style={{ cursor: "pointer" }} onChange={(e) => handleExpert(e.target.value)} />
                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
              </div>
            </div>

            {
              show &&
              <div class="input-container">
                <input type="text" class="input" placeholder='Expert en quel domaine' onChange={(e) => setExpertDomain(e.target.value)} />
              </div>
            }

            <div className='input-container1'>
              <input type="submit" value="Envoyer" class="btn btn-outline-primary signup" style={{ width: "11rem", height: "40px" }} />
              <div style={{color:"#fff"}}>
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