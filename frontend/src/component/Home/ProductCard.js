import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'



const ProductCard = ({product}) => {
  
const options = {
  edit:false,
  color:"tomato",
  activeColor:"red",
  value:product.ratings,
  isHalf: true
}
  return (
    <>
<Link className='productCard' to={`/product/${product._id}`}>

<img src={product.images} alt={product.name}/>

<p style={{textAlign:"center" , fontFamily:"cursive"}}>{product.name}</p>
<p  style={{textAlign:"center",  fontFamily:"cursive"}}>{product.description}</p>
{/* <p>{product.category}</p> */}

<div>
    <ReactStars {...options} /> <span  style={{textAlign:"center" ,  fontFamily:"cursive"}}> ({product.numOfReviews} Reviews) </span>
</div>

<span  style={{textAlign:"center" , fontFamily:"cursive"}}>{`₹${product.price}`}</span>

</Link>
    </>
  )
}

export default ProductCard