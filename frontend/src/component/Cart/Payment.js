import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)
 

const Payment = () => {
  const navigate = useNavigate()

  const publishableKey = 'pk_test_51MBzy2SIQ60BsYJXed9AAvAecYfpLSz5fHuIPsL78ofJHesOQltgWe3oQTWD8ajDgEtI9qdxjR9woP6vTt3aBpBC001gIHHvt0';

  const [product , setProduct] = useState({
    name:"headphone",
    price: 10,
  })


  const priceForStripe = product.price*100;

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
      <div className="container">
        <h1>complete stripe payment gateway...</h1>
        <p>

        <span>Product:</span>

       {product.name}
        </p>
       

        <span>Price:</span>
        {product.price}

        <StripeCheckout

          stripeKey={publishableKey}
          label='Pay Now'
          name=''
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`you total${product.price}`}
          token={payNow}
         
        />
      </div>
    </>

  )
}

export default Payment