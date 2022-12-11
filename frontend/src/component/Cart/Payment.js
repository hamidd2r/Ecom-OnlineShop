import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from '../Cart/CheckoutSteps'
import { useSelector , useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";

  import axios from 'axios';
  import './payment.css'
  
  import CreditCardIcon from '@mui/icons-material/CreditCard';
  import EventIcon from '@mui/icons-material/Event';
  import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const Payment = () => {
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

 

    const dispatch = useDispatch();
//   const stripe = useStripe();
//   const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);


//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };


  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

 

   
    
  const submitHandler = () =>{

    

  }


  const redirect = () =>{
   navigate('/success')

  }

     
  useEffect(() => {
   
  }, [dispatch, alert]);


  



  return (
    <>
        <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
       <form 
       className='paymentForm'>

        <Typography>Card Info</Typography>
        <div>
            <CreditCardIcon/>
            {/* <CardNumberElement className='paymentInput'/> */}
            <input type="text" className='paymentInput' placeholder='4000 0027 6000 1023' />
        </div>


        <div>
            <EventIcon/>
            {/* <CardExpiryElement className='paymentInput'/> */}
            <input type="text" className='paymentInput' placeholder='02 / 22' />

        </div>



        <div>
            <VpnKeyIcon/>
            {/* <CardCvcElement className='paymentInput'/> */}
            <input  type="text" className='paymentInput' placeholder='9 8 3' />

            
        </div>


        <input
         type="submit"
          value={`Pay -  ₹ ${orderInfo && orderInfo.totalPrice}`}
          ref= {payBtn}
          onClick={redirect}
          className='paymentFormBtn'
           />






        
       </form>
      </div>
    </Fragment>
    </>
  )
}

export default Payment