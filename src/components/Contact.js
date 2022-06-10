import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import LoadingBox from './LoadingBox';

const Contact = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);

  const [userName, setUserName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [numTel, setNumTel] = useState(userInfo ? userInfo.numTel : "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory() ;
  const handleSubmit = (e) => {
    if(!localStorage.getItem("userInfo")) {
      swal("oops","must be signin first","warning") ;
      history.push("/signin") ;
      return ;
    };

    e.preventDefault();

    fetch("http://102.219.178.49:5000/api/contactUs", {      //fetch is used to make requests from the client to the server .
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        numTel,
        message
      }),
    })
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setLoading(false);
          swal("done!", "Votre Message est envoyé avec succés", "success");
        }
        return data;
      })
      .catch((err) => {
        setLoading(false);
        swal("error!", "une erreur s'est produite, veuillez réessayer plus tard", "warning");
      });
  }


  return (
    <div className='holder'>
      <div class="background-container" style={{ background: "rgb(247 247 247 / 95%)", }}>
      </div>
      <span class="big-circle"></span>
      <img src="img/shape.png" class="square" alt="" />
      <div class="form">
        <div class="contact-info">
          <h3 class="title">Contactez-nous</h3>
          {loading && <LoadingBox> En cours ... </LoadingBox>}
          <p class="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>

          <div class="info">
            <div className="information">
              <p>Email : <b>siwarbenkraeim1@gmail.com</b></p>
            </div>
            <div className="information">
              <img src="img/phone.png" class="icon" alt="" />
              <p>Num tel : <b> 52070045</b></p>
            </div>
          </div>

          <div class="social-media">
            <p>Contactez-nous</p>
            <div class="social-icons">
              <a href="https://www.facebook.com/EPACTTunsie/" target={"_blank"}>
                <i class="fab fa-facebook-f"></i>
              </a>
              <Link to="#">
                <i class="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <span class="circle one"></span>
          <span class="circle two"></span>

          <form action="" onSubmit={handleSubmit}>
            <h3 class="title">Contactez-nous</h3>
            <div class="input-container">
              <input type="text" name="name" className="input" placeholder='Nom et prénom' value={userName} onChange={(e) => setUserName(e.target.value)} required />

            </div>
            <div class="input-container">
              <input type="email" name="email" className="input" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

            </div>
            <div class="input-container">
              <input type="tel" name="phone" className="input" placeholder='Num tél' value={numTel} onChange={(e) => setNumTel(e.target.value)} required />

            </div>
            <div class="input-container textarea">
              <textarea name="message" className="input" placeholder='Votre Message' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

            </div>
            <input type="submit" value="Envoyer" className="btn" style={{ width: "90%" }} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;