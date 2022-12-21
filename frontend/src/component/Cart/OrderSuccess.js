import { Typography } from '@mui/material'
import React from 'react'


import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import './orderSuccess.css'
import { useSearchParams } from 'react-router-dom'

import successimg from '../../images/success.svg'

const OrderSuccess = () => {

  const searchQuery = useSearchParams()[0]
  const referenceNum = searchQuery.get('reference')



  return (
    <>
         <div className="orderSuccess">
      <CheckIcon />

      <img style={{marginTop:"100px"}} src={successimg} alt="" height={200} />
      <Typography>Your order has been placed successfully </Typography>
      <p>Reference No  : <span style={{color:"tomato"}}>{referenceNum}</span></p>
      <Link to="/orders">View Orders</Link>
    </div>
    </>
  )
}

export default OrderSuccess