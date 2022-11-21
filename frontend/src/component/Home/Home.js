import React, { Fragment, useEffect } from "react";
import Product from './Product.js'
import "./Home.css";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import {getProduct} from '../../actions/productAction'
import { useSelector , useDispatch} from 'react-redux'
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
const product = {
  name:"blue shirt ",
  images:[{url:"https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:good,w_700/India%20LOB/Clothing%20and%20Bags/Men's%20Embroidered%20Polo%20T-Shirts/IN_Men_s-Embroidered-Polo-T-Shirts_Overview"}],
  price:"3000₹",
  _id :"abhi"
}
const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getProduct());
  },[dispatch]);

  return (
   
    <>

<MetaData title= "Ecommerce" />

<div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>


        
          <div className="container" id="container">
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
          </div>


        
       
   </>
  )
}

export default Home