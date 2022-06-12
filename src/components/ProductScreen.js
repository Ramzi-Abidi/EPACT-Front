//the UI : el king yaayet lel slaves bl useDispatch() fy useEffect() . w baaed yjib e state ely tbadlt bl useSelector(means yparcoury el states lkol w yjibha), w baaed bouna2an 3lehe yrajja3ha JSX wela conditional rendering 3a property taa e state . 

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const ProductScreen = (props) => {
  const history= useHistory();

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
      if(localStorage.getItem("userInfo"))
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
                <Link to="/" className='back-to-home' style={{ marginLeft: "20px", fontWeight: "bold", color: "#333" }}> back to home</Link>
                <div className="row top" style={{margin:"0 3.5rem"}}>
                  <div className="col-2">
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
                            <div className='price'> {product.price} dt</div>
                          </div>
                        </li>
                        <li>
                          <div className='content'>
                            <h4>Qty:</h4>
                            <div className='selectContainer'>
                              <select value={qty} onChange={e => setQty(e.target.value)}>
                                <option key={1} value={1}> 1 </option>
                                <option key={2} value={2}> 2 </option>
                                <option key={3} value={3}> 3 </option>
                              </select>
                            </div>
                          </div>
                          <li className='btn-container'>
                            <button className='btn primary block' onClick={handleAddToCart}>
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
