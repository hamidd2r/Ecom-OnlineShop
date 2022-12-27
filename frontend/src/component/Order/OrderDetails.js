import React, { Fragment, useEffect } from 'react'
import './OrderDetails.css'
import { useSelector , useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails , clearErrors } from '../../actions/orderAction'
import Loader from '../layout/Loader/Loader'
import { Typography } from '@mui/material'


const OrderDetails = () => {
    const { id }   = useParams();
    const { order, error } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch()

    useEffect(()=>{

        if(error) {
            alert("eror")
            dispatch(clearErrors())
        }

        dispatch(getOrderDetails(id))

    },[dispatch,error , id])

  return (
    <>
    <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography style={{textAlign:"center"}} component="h1">
                Order #{order && order._id}
              </Typography>
              <div class="container">
  <div class="row">
    <div class=" col-md-4">
    <Typography>Shipping Info</Typography>
 <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <p>Md Hamid Ali</p>
                  
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                  <span> {order && order.shippingInfo && order.shippingInfo.phoneNo ? (<span>{order.shippingInfo.phoneNo}</span> ):('') } </span>
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span> {order && order.shippingInfo && order.shippingInfo.address } ,{order && order.shippingInfo && order.shippingInfo.city } ,
                  {order && order.shippingInfo && order.shippingInfo.state } , {order && order.shippingInfo && order.shippingInfo.pinCode } ,  {order && order.shippingInfo && order.shippingInfo.country }
                   </span>
                </div>
              </div>

    </div>
    <div class=" col-md-4">

    <Typography>Payment</Typography>
     <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order && order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order && order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span> {order && order.totalPrice && order.totalPrice ? (<span>{order.totalPrice}</span> ):('') } </span>
                </div>
              </div>
    </div>
    <div class=" col-md-4">

    <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                        order && order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                  <span> {order && order.orderStatus && order.orderStatus ? (<span>{order.orderStatus}</span> ):('') } </span>
                  </p>
                </div>
              </div>
    </div>
  </div>
</div>

            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order && order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Fragment>
    </>
  )
}

export default OrderDetails