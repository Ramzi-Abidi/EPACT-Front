import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductScreen from './components/ProductScreen';
import Contact from './components/Contact';
import AnimatedPage from './components/AnimatedPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import CartScreen from './components/CartScreen';
import Apropos from './components/Apropos';
import { useDispatch, useSelector } from 'react-redux';
import ShippingAdress from './components/ShippingAdress';
import PlaceOrder from './components/PlaceOrder';
import ProfileScreen from './components/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Post from './components/Post';
import Productlist from './components/Productlist';
import Item from './components/Item';
import EditProduct from "./components/EditProduct";
import Footer from './components/Footer';
import Orders from './components/Orders';
import Swiper from './components/Swiper';
import OrderScreen from "./components/OrderScreen" ;

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo);

  return (
    <BrowserRouter>

      <div className="App">

        <div className="grid-container">
          <Header userInfo={userInfo} />

          <main>
            <Route path="/" exact>
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            </Route>
            
            <Route path="/swiper">
                <Swiper />
            </Route>

            {/*         <Route path="/" component={Home}>
            </Route> */}

            {/*         <Route path="/products">
          <AnimatedPage>
            <Products />
          </AnimatedPage>
        </Route> */}

            <Route path="/item">
              <Item />
            </Route>

            <Route path="/contact">
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            </Route>

            <PrivateRoute path="/profile" component={ProfileScreen}>
            </PrivateRoute>

            <Route path="/signup">
              <AnimatedPage>
                <Signup />
              </AnimatedPage>
            </Route>

            <Route path="/signin">
              <AnimatedPage>
                <Signin />
              </AnimatedPage>
            </Route>

            <Route path="/product/:id" component={ProductScreen}>
            </Route>

            <Route path="/editProduct/:id" component={EditProduct}>
            </Route>

            {/*             <Route path="/placeOrder" component={PlaceOrder}>
            </Route> */}

            <Route path="/aboutUs">
              <AnimatedPage>
                <Apropos />
              </AnimatedPage>
            </Route>

            <Route path="/post">
              <AnimatedPage>
                <Post />
              </AnimatedPage>
            </Route>

            <Route path="/shipping">
              <AnimatedPage>
                <ShippingAdress />
              </AnimatedPage>
            </Route>

            <Route path="/placeOrder">
              <AnimatedPage>
                <PlaceOrder />
              </AnimatedPage>
            </Route>

            <Route path="/productlist">
              <AnimatedPage>
                <Productlist />
              </AnimatedPage>
            </Route>

            <Route path="/orders">
              <AnimatedPage>
                <OrderScreen />
                {/*<Order />*/}
              </AnimatedPage>
            </Route>

            
            <Route path="/cart/:id?" component={CartScreen}>
            </Route>
          </main>

            <Footer />
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App;
