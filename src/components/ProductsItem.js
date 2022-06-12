import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "../../src/App.css";
import MessageBox from './MessageBox';

import SingleProduct from './SingleProduct';


export default ({ products, setProducts }) => {
    //const [newProducts, setNewProducts] = useState(null);


    return (
        <>
            <div className='product-holder'>
                {
                    products.map((prod) => {
                        return (
                            <SingleProduct prod={prod} setProducts={setProducts} products={products}  />
                        )
                    })

                }
                {/*    <Swiper style={{ marginTop: "6rem" }} spaceBetween={30} slidesPerView={3}>
                {
                    products.map((prod) => {
                        return (

                            <SwiperSlide style={{ position: "relative" }}> 
                            <SingleProduct prod={prod} />
                        
                                
                             </SwiperSlide> 
                             )
                             
                            })
                        }
                        
                    </Swiper> */}
            </div>
        </>
    );
};