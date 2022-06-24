import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from "../images/Asset 1.png";
import { useHistory } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import basket from "../images/2613917_basket_cart_shop_shopping_icon.png";

const Header = ({ userInfo }) => {

  const [click, setClick] = useState(false);

  //drop down funcionality
  const handlDropDownClick = () => {
    document.querySelector(".dropdown-content").style.display = "block";
  };

  const handleMenuClick = () => {
    setClick(!click);
  }

  console.log(userInfo);

  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  console.log(cart);
  const { cartItems } = cart;

  const handleClick = () => {
    history.push("/");
  };

  const signoutHandler = () => {
    if (click) {
      setClick(!click);
    }

    localStorage.removeItem("cartItems");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    history.push("/signin");

    //to refresh the page
    window.location.reload(true);
  };

  return (
    <header className="row" color='#333' style={{ width: "100%" }}>
      <div className='first'>
        <div className='img-container' style={{width:"35%"}}>
          <img src={Image} onClick={handleClick} />
        </div>
      </div>

      <div onClick={handleMenuClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} aria-hidden="true"></i>
      </div>

      <ul className={click ? "active" : "notActive"}>

        <div className='itemsContainer'>
          {
            userInfo && userInfo.isAdmin &&
            <Link to="#admin" className='user-container noHover'>
              <FaUserCircle style={{ position: "relative", top: "-1.5px", marginRight: "3.5px" }} /> Admin
              <i className="fa fa-caret-down"></i>
            </Link>

          }
          {
            userInfo && !userInfo.isAdmin &&
            <Link to="#" className='user-container noHover' onClick={handlDropDownClick}> <FaUserCircle style={{ position: "relative", top: "-1px !important", marginRight: "8px" }} />{" "}
              {userInfo.name} <i className="fa fa-caret-down"></i>{' '} {/*<i class="fa-solid fa-user"></i>*/}
            </Link>
          }

          <Link to="/cart" className='links' onClick={handleMenuClick}>

            {/* <i class="fa-solid fa-basket-shopping"></i> */}
            <img src={basket} style={{ width: "2.9rem" }} />
            {cartItems.length > 0 ? <span className='badge'> {cartItems.length} </span> : <span className='badge'> 0 </span>}
          </Link>

          <Link to="/" className='links' onClick={handleMenuClick}>Accueil</Link>
          <Link to="/contact" className='links' onClick={handleMenuClick}>Contact</Link>
          <Link to="/aboutUs" className='links' onClick={handleMenuClick}>à propos</Link>

          {
            userInfo && userInfo.isAdmin === false && (

              <>

                <Link to="/profile" className="links" onClick={handleMenuClick}>Mon compte</Link>
                <Link to="#" onClick={signoutHandler} className="links">
                  Déconnexion
                </Link>
              </>
            )
          }

          {
            !userInfo && (
              <>
                <Link to="signin" className='links' onClick={handleMenuClick}> Se connecter </Link>
                <Link to="/signup" className='links' onClick={handleMenuClick}>S'inscrire</Link>
              </>
            )
          }

          {userInfo && userInfo.isAdmin && (
            <>
              {/*           <Link to="/dashboard" className='links'>Dashboard</Link> */}
              <Link to="/productlist" className='links' onClick={handleMenuClick}>Ajouter Produit</Link>
              <Link to="/orders" className='links' onClick={handleMenuClick}>Commandes</Link>
              {/*               <Link to="/userlist" className='links' onClick={handleMenuClick}>Users</Link> */}
              <Link to="/profile" className='links' onClick={handleMenuClick}>Mon compte</Link>
              <Link to="/post" className='links' onClick={handleMenuClick}>Publier quelque chose</Link>
              <Link to="#" onClick={signoutHandler} className='links'>
                Sign Out
              </Link>
            </>
          )}
        </div>
      </ul>


      <div className='second' style={{ display: "flex", alignItems: "center" }}>
        <ul style={{ display: "flex", alignItems: "center" }}>
          <li>
            <Link to="/cart" className='links firstLinks'>

            <img src={basket} style={{ width: "2.9rem" }} />

              {cartItems.length > 0 ? <span className='badge'> {cartItems.length} </span> : <span className='badge'> 0 </span>}
            </Link>
          </li>
          <li>
            <Link to="/" className='links firstLinks'>Accueil</Link>
          </li>
          <li>
            <Link to="/contact" className='links firstLinks'>Contact</Link>
          </li>
          <li>
            <Link to="/aboutUs" className='links firstLinks'>à propos</Link>
          </li>
          {/*<Link to="/signin" className='links'>Sign In</Link>*/}
          {!userInfo && (
            <>
              <Link to="signin" className='links firstLinks'>Se connecter</Link>
            </>
          )
          }
        </ul>

        {
          userInfo && userInfo.isAdmin === false && (
            <div className="dropdown">
              <Link to="#" className='user-container noHover' onClick={handlDropDownClick} > <FaUserCircle style={{ position: "relative", top: "-1px", marginRight: "8px" }} />{" "}
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '} {/*<i class="fa-solid fa-user"></i>*/}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile" style={{ color: "#FFF", fontSize: "13px" }}>Mon compte</Link>
                </li>
                <li >
                  <Link to="#" onClick={signoutHandler} style={{ color: "#FFF", fontSize: "13px", marginTop: "15px" }} >
                    Déconnexion
                  </Link>
                </li>
              </ul>
            </div>
          )
        }


        {/* */}



        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#admin" className='user-container noHover'>
              <FaUserCircle style={{ position: "relative", top: "-1px", marginRight: "3.7px" }} /> Admin
              <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li style={{ marginTop: ".5rem" }}>
                <Link to="/productlist" style={{ color: "#FFF", fontSize: "13px" }}>Ajouter produit</Link>
              </li>
              <li style={{ marginTop: ".5rem" }}>
                <Link to="/orders" style={{ color: "#FFF", fontSize: "13px" }}>Commandes</Link>
              </li>
              {/*      <li style={{ marginTop: ".5rem" }}>
                <Link to="/userlist" style={{ color: "#FFF", fontSize: "13px" }}>Users</Link>
              </li> */}
              <li style={{ marginTop: "1rem" }}>
                <Link to="/profile" style={{ color: "#FFF", fontSize: "13px" }}> Mon compte</Link>
              </li>
              <li style={{ marginTop: "1rem" }}>
                <Link to="/post" style={{ color: "#FFF", fontSize: "13px" }}>Publier</Link>
              </li>
              <li style={{ marginTop: "1rem" }}>
                <Link to="#signout" onClick={signoutHandler} style={{ color: "#FFF", fontSize: "13px" }}>
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        )}

      </div>

    </header>

  )
}

export default Header