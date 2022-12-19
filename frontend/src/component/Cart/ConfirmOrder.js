import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Card from "../Payment/Card";
import { useNavigate } from "react-router-dom";
import { getOrderDetails , clearErrors , updateOrder } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";



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


  const checkoutHandler = async(amount) =>{
    const {data:{key}} = await axios.get('http://localhost:4000/api/getkey')
    const {data:{order}}  = await axios.post("http://localhost:4000/api/v1/checkout" , {
      amount
    })
    var options = {
      key, 
      amount: order.amount, 
      currency: "INR",
      name: "Md Hamid Ali",
      description: "this is transection of ecom ",
      image: "https://media.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_800_800/0/1666006884322?e=1677110400&v=beta&t=VZ8sfjNtRcwgc9Vv1l3mGdcpry5ex4njvs9Si-uX3tk",
      order_id: order.id, 
      callback_url: "http://localhost:4000/api/v1/paymentverification",
      prefill: {
          "name": "hamid",
          "email": "hamid.ali@example.com",
          "contact": "8988766554"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#FF6347"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open();
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

             {/*  */}
             <Box>
            <Stack h={"100vh" } justifyContent="center" alignItems="center" direction={["column" , "row"]}>
            <Card onClick={proceedToPayment}  amount={totalPrice} img="https://media.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_800_800/0/1666006884322?e=1677110400&v=beta&t=VZ8sfjNtRcwgc9Vv1l3mGdcpry5ex4njvs9Si-uX3tk"  checkoutHandler={checkoutHandler} />
            </Stack>
        </Box>
        {/*  */}
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ConfirmOrder;
