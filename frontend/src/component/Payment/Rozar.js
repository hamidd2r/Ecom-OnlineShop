import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Rozar = () => {
  const navigate = useNavigate()
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
          "color": "#000000"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open();
  }
  return (
    <>
        <Box>
            <Stack h={"100vh" } justifyContent="center" alignItems="center" direction={["column" , "row"]}>
            <Card  amount={500} img="https://media.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_800_800/0/1666006884322?e=1677110400&v=beta&t=VZ8sfjNtRcwgc9Vv1l3mGdcpry5ex4njvs9Si-uX3tk"  checkoutHandler={checkoutHandler} />
            {/* <Card amount={503} img="https://media.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_800_800/0/1666006884322?e=1677110400&v=beta&t=VZ8sfjNtRcwgc9Vv1l3mGdcpry5ex4njvs9Si-uX3tk"  checkoutHandler={checkoutHandler} /> */}
            </Stack>
        </Box>
    </>
  )
}

export default Rozar