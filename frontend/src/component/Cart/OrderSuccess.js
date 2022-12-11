import { Typography } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import './orderSuccess.css'

const OrderSuccess = () => {
  return (
    <>
         <div className="orderSuccess">
      <CheckIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
    </>
  )
}

export default OrderSuccess