
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { detailsProduct } from '../actions/productAction';
import AnimatedPage from './AnimatedPage';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const ProductScreen = (props) => {
  const history = useHistory();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!localStorage.getItem("userInfo")){
      history.push("/signin");
    }
    dispatch(detailsProduct(props.match.params.id));
  }, []);

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  console.log(props);

  if (!product)
    return <div>Il n'y a pas ce produit </div>

  const handleAddToCart = () => {
 /*    if(qty<1)
      return false; */
    if (localStorage.getItem("userInfo"))
      history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    //history.push(`/cart/`);
    else {
      swal("Error", "Vous devez d'abord vous connecter", "warning");
      history.push(`/signin`);
    }
  };

  return (
    <AnimatedPage>

      <div className="row center">
        {loading ? <LoadingBox />
          :
          error ? <MessageBox variant={"danger"}> {error} </MessageBox>
            :
            (
              <>

                <div className="row top" style={{ margin: "4rem 1rem" }}>
                  <div className="col-2" style={{ marginRight: "3rem" }}>
                    <img src={`http://102.219.178.49:5000/${product.image}`} className="large" alt={product.name} />
                  </div>
                  <div className="col-1 ">
                    <div className='card card-body'>
                      <ul style={{ paddingLeft: "0", margin: "1.2rem" }}>
                        <li style={{ display: "flex" }}>
                          <h4 className='title'> <b>Nom :</b> </h4>  <h4 style={{ marginLeft: "1rem", marginBottom: "0" }}>{product.name} </h4>
                        </li>
                        <li style={{ display: "flex", alignItems: "center" }}>
                          <h4 className='top-margin'><b>Prix : </b></h4> <h4 style={{ marginLeft: "1rem", marginBottom: "0" }}> {product.price} dt </h4>
                        </li>
                        {/* <h4 className='top-margin'><b> Description :</b> </h4> <h4> {product.description} </h4> */}
                      </ul>
                    </div>

                  </div>
                  <div className="col-1">
                    <div className='card card-body'>
                      <ul style={{ paddingLeft: "0", margin: "1.2rem" }}>
                        <li>
                          <div className='content'>
                            <h4 className='title2'>Prix : </h4>
                            <div> <h3> {product.price} dt  </h3> </div>
                          </div>
                        </li>
                        <li>
                        <form onSubmit={handleAddToCart} style={{padding:"0"}}>

                          <div className='content'>
                            <h4 style={{ margin: "1.7rem 0" }}>Qte:</h4>
                            
                            <div className='input-number-container'>
                              <div class="form-group">


                                <input type="number"
                                  className='input-number'
                                  onChange={(e) => setQty(e.target.value)}
                                  min={1}
                                />
                              </div>
                            </div>
                          </div>
                          <li className='btn-container'>
                            <button type='submit' className='btn btn-warning' /* onClick={handleAddToCart} */ style={{ background: "#049A5B", border: "none", padding: ".6rem" }}>
                              Ajouter au panier
                            </button>
                          </li>
                          </form>

                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )
        }
      </div>
      </AnimatedPage>
  )
}

export default ProductScreen;
