//the UI : el king yaayet lel slaves bl useDispatch() fy useEffect() . w baaed yjib e state ely tbadlt bl useSelector(means yparcoury el states lkol w yjibha), w baaed bouna2an 3lehe yrajja3ha JSX wela conditional rendering 3a property taa e state . 

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const ProductScreen = (props) => {
  const history = useHistory();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));   //naaytou lel slaves(fcts mtaa el action) bl useDispatch() ;
  }, []);

  //baddelna fl state with the previous "useEffect()" w tawa naawdo njiboha e state .
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  console.log(props);

  if (!product)
    return <div>Il n'y a pas ce produit </div>

  const handleAddToCart = () => {
    if (localStorage.getItem("userInfo"))
      history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    //history.push(`/cart/`);
    else {
      props.history.push("/signin");
    }
  };

  return (
    <>
      <div className="row center">
        {loading ? <LoadingBox />
          :
          error ? <MessageBox variant={"danger"}> {error} </MessageBox>
            :
            (
              <>
               {/*  <div>
                  <Link to="/" className='back-to-home' style={{ marginLeft: "20px", fontWeight: "bold", color: "#333" }}> back to home</Link>
                  <button type="button" class="btn btn-primary" onClick={() => history.push("/")}>Retour</button>
                </div> */}

                <div className="row top" style={{ margin: "4rem 1rem" }}>
                  <div className="col-2" style={{marginRight:"3rem"}}>
                    <img src={`http://102.219.178.49:5000/${product.image}`} className="large" alt={product.name} />
                  </div>
                  <div className="col-1 ">
                    <div className='card card-body'>
                      <ul>
                        <li>
                          <h1 className='title'> {product.name} </h1>
                        </li>
                        <h4 className='top-margin'>Prix : </h4> {product.price} dt
                        <h4 className='top-margin'>Description : </h4> {product.description}
                      </ul>
                    </div>

                  </div>
                  <div className="col-1">
                    <div className='card card-body'>
                      <ul>
                        <li>
                          <div className='content'>
                            <h4 className='title2'>Prix : </h4>
                            <div> <h3> {product.price} dt  </h3> </div>
                          </div>
                        </li>
                        <li>
                          <div className='content'>
                            <h4 style={{ margin: "1.7rem 0" }}>Qty:</h4>
                            <div className=''>
                              <div class="form-group">
                                <select class="form-select" style={{ margin: "1.7rem 0" }} id="exampleSelect1">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>

                                </select>
                              </div>
                            </div>
                          </div>
                          <li className='btn-container'>
                            <button className='btn btn-warning' onClick={handleAddToCart}>
                              Ajouter au panier
                            </button>
                          </li>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )
        }
      </div>
    </>
  )
}

export default ProductScreen;
