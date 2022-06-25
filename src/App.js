import 'bootswatch/dist/slate/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.css';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductScreen from './components/ProductScreen';
import Contact from './components/Contact';
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
import OrderScreen from "./components/OrderScreen";
import Tojrab from "./components/Tojrab";
import CommentScreen from './components/CommentScreen';
import PageNotFound from './components/PageNotFound';

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
            <Switch>

              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/swiper" exact>
                <Swiper />
              </Route>

              <Route path="/tojrab">
                <Tojrab />
              </Route>

              <Route path="/item" exact>
                <Item />
              </Route>

              <Route path="/contact" exact>
                <Contact />
              </Route>

              <PrivateRoute path="/profile" component={ProfileScreen} exact>
              </PrivateRoute>

              <Route path="/signup" exact>
                <Signup />
              </Route>

              <Route path="/signin" exact>
                <Signin />
              </Route>

              <Route path="/product/:id" component={ProductScreen} exact>
              </Route>

              <Route path="/comment/:id" component={CommentScreen} exact>
              </Route>

              <Route path="/editProduct/:id" component={EditProduct} exact>
              </Route>

              <Route path="/aboutUs" exact>
                <Apropos />
              </Route>

              <Route path="/post" exact>
                <Post />
              </Route>

              <Route path="/shipping" exact>
                <ShippingAdress />
              </Route>

              <Route path="/placeOrder" exact>
                <PlaceOrder />
              </Route>

              <Route path="/productlist" exact>
                <Productlist />
              </Route>

              <Route path="/orders" exact>
                <OrderScreen />
                {/*<Order />*/}
              </Route>

              <Route exact path="/cart/:id?" component={CartScreen}>
              </Route>

              <Route path="*" component={PageNotFound} />
        </Switch>
          </main>

          <Footer />


      </div>

    </div>

    </BrowserRouter >

  );
}

export default App;
