import React, { Fragment } from "react";
import "./Cart.css";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsToCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cartimg from '../../images/undraw_empty_cart_co35.svg'

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };


  const deleteCartItems = (id) =>{
    dispatch(removeItemsToCart(id))
  }

  const checkoutHandler =  () =>{
    navigate('/shipping')
  }

  return (
    <>
    <div className="cartsection">
      {cartItems.length === 0 ?  (
        <div className="emptyCart">
<img style={{marginTop:"100px"}} src={cartimg} alt="" height={200} />
       {/* <RemoveShoppingCartIcon/> */}
       <Typography>Not product in your carts</Typography>
       <Link to= '/products'>View Products</Link>
        </div>
      ) : (
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} deleteCartItems={deleteCartItems}  />
              <div className="cartInput">
                <button
                 onClick={() =>
                    decreaseQuantity(item.product, item.quantity)
                  }
                >-</button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.Stock)
                  }
                  style={{ marginLeft: "-15px" }}
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`₹${cartItems.reduce(
              (acc, item)=> acc+item.quantity * item.price,
              0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
      )
      }
      
    </div>
    </>
  );
};

export default Cart;
