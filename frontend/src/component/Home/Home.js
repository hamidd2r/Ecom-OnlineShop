import React, { Fragment, useEffect } from "react";
import Product from './ProductCard.js'
import "./Home.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from '../../actions/productAction'
import { useSelector , useDispatch} from 'react-redux'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Loader from "../layout/Loader/Loader.js";
import img1 from '../../images/p5.webp'
import img2 from '../../images/p2.webp'
import img3 from '../../images/p3.webp'
import img4 from '../../images/eid.webp'
import img5 from '../../images/discount.webp'
 
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
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">

    <div class="carousel-item active">
      <img src={img1} class="d-block w-100" alt="..." height={400}/>
    </div>

    <div class="carousel-item">
      <img src={img2} class="d-block w-100" alt="..." height={400}/>
    </div>

    <div class="carousel-item">
     <img src={img3} class="d-block w-100" alt="..." height={400}/>
    </div>

     <div class="carousel-item">
     <img src={img4} class="d-block w-100" alt="..." height={400}/>
    </div>

    <div class="carousel-item">
     <img src={img5} class="d-block w-100" alt="..." height={400}/>
    </div>
 

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>




{/* <div className="banner">
            <p>Ecommerce Website</p>
            <h1>APNA DUKAAN PRODUCTS</h1>
            <a href="#container">
              <button>
               <ArrowCircleDownIcon/> 
              </button>
            </a>
          </div> */}
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