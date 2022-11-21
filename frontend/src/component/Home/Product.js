import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


const options = {
    edit:false,
    color:"tomato",
    activeColor:"red",
    // size:window.innerWidth <600 ? 10 : 20,
    value:4.5,
    isHalf: true
    
}

const Product = ({product}) => {
  return (
    <>
<Link className='productCard' to={product._id}>
<img src={product.images[0].url} alt="" />
<p>{product.name}</p>

<div>
    <ReactStars {...options} /> <span> (239 Reviews) </span>
</div>

<span>{product.price}</span>

</Link>
    </>
  )
}

export default Product