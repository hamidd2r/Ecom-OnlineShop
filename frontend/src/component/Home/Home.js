import React, { Fragment, useEffect } from "react";
import Product from './ProductCard.js'
import "./Home.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from '../../actions/productAction'
import { useSelector , useDispatch} from 'react-redux'
import Loader from "../layout/Loader/Loader.js";
 
const Home = () => { 

  const dispatch = useDispatch();
  const {loading , error , products } = useSelector(
    (state)=> state.products
  );

  useEffect(() => {
    if(error) {
      alert.error(error)
      dispatch(clearErrors)
  }

    dispatch(getProduct());
  },[dispatch]);

  return (
   
     <>
<MetaData title= "Ecommerce" />
<div className="banner">
            <p>Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
         {
          products && products.map(product=>(
            <Product product={product}/>
          ))
         }
          </div>
   </>
  )
}

export default Home