import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import { useDispatch } from 'react-redux';

const Products = () => {
  //njibo el property taa e state ly hajtna behe .
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <>
      <div className="row center">
        {loading ? <LoadingBox />
          :
          error ? <MessageBox variant={"danger"}> {error} </MessageBox>
            :
            products.map((prod) => {
              return (
                <SingleProduct key={prod.id} prod={prod} />
              )
            })
        }
      </div>
    </>
  )
}

export default Products;