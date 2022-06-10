import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "../../src/App.css";
import MessageBox from './MessageBox';

import SingleProduct from './SingleProduct';


export default ({ products }) => {

    return (
        <div className='product-holder'>
            {
                products.map((prod) => {
                    return (
                        <SingleProduct prod={prod} />
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

                {products.length === 0 && <MessageBox> Aucun produit cliquez ici pour ajouter des nouveaux <Link to="productlist" style={{ margin: "0 1.5rem", fontWeight: "bold", textDecoration: "underline" }}> Ajouter </Link> </MessageBox>}
            </Swiper> */}
        </div>
    );
};