import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {  ThreeDots } from 'react-loader-spinner'


const LoadingBox = () => {
  return (
    <div>
      <ThreeDots color="#00BFFF" height={80} width={80} />

    </div>
  )
}

export default LoadingBox;