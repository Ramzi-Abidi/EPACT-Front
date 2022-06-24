import React from 'react'
import { Link } from 'react-router-dom';
import "./footer.css";


const Footer = () => {
  return (
    <footer class="footer">
      <div class="container-footer">
        <div class="the-row">
          <div class="footer-col">
            <h4>EPACT</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/contact">Contactez nous</Link></li>
              <li><Link to="/cart">Panier</Link></li>
              <li><Link to="/aboutUs">à propos</Link></li>
            </ul>
          </div>
          {/*         <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div> */}
          <div class="footer-col">
            <h4>Suivez-nous</h4>
            <div class="social-links">
              <a href="https://www.facebook.com/EPACTTunsie/" target={"_blank"}><i class="fab fa-facebook-f">  </i></a> 
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer