import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { useNavigate } from "react-router-dom";
import { getOrderDetails , clearErrors , updateOrder } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";

const MySwal = withReactContent(Swal)
const ConfirmOrder = () => {
    const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal < 1000 ? 0 : 200;

  const tex = subtotal * 0.18;

  const totalPrice = subtotal + tex + shippingCharges;

  const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country}`;

  const proceedToPayment = () =>{
    const data = {
        subtotal,
        shippingCharges,
        tex,
        totalPrice,
    };

    sessionStorage.setItem("orderInfo" , JSON.stringify(data))
    navigate('/')
  };

  const publishableKey = 'pk_test_51MBzy2SIQ60BsYJXed9AAvAecYfpLSz5fHuIPsL78ofJHesOQltgWe3oQTWD8ajDgEtI9qdxjR9woP6vTt3aBpBC001gIHHvt0';

  const [product , setProduct] = useState({
    name:"headphone",
    price: 10,
  })



  const handleSuccess = () =>{
    MySwal.fire({
      icon:'success',
      title:'payment was successful',
      time:400
    })

  }

 
  const payNow =  async token => {
    try {
      const response = await axios({
        url:'http://localhost:4000/payment',
        method:'post',
        data: {
          amount:product.price*100,
          token,
        },
      });

      if(response.status === 200){
        handleSuccess();
    navigate('/success')

      }
      
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
      <Fragment>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span style={{color:"gray"}}>hamid</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                  
                      <img src={item.image} alt="a" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Order Summery</Typography>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <span>₹{subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div>
                  <p>GST:</p>
                  <span>₹{tex}</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p>
                  <b>Total:</b>
                </p>
                <span>₹{totalPrice}</span>
              </div>

              <StripeCheckout
              
stripeKey={publishableKey}
label={`₹${totalPrice}`}
name= 'Md Hamid Ali'
billingAddress
email="admin@gmail.com"

shippingAddress
amount={proceedToPayment}
description={`₹${totalPrice}`}
token={payNow}

/>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ConfirmOrder;
