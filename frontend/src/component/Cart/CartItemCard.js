import React from 'react'
import { Link } from 'react-router-dom'
import { removeItemsToCart } from '../../actions/cartAction'
import './CartItemCard.css'
export const CartItemCard = ({item , deleteCartItems}) => {
  return (
    <>
<div className="CartItemCard">
<img src='https://media-exp1.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_400_400/0/1666006884322?e=1675296000&v=beta&t=aVYxPU6mOqTkI0O1P8h6XMC8p8Jrt44RIr9J12Db34Y' />

<div>
    <Link to={`/product/${item.product}`}>{item.name}</Link>
    <span>{`price : ${item.price}`}</span>
    <p onClick={()=> deleteCartItems(item.product)}>Remove</p>
</div>

</div>
    </>
  )
}


export default CartItemCard;
