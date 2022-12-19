import { Button, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import "../Cart/ConfirmOrder.css";
const Card = ({amount  , checkoutHandler}) => {
  return (
    <>
      <VStack>
        <Button className='button' onClick={()=>checkoutHandler(amount)} >{`Place Order`}</Button>
      </VStack>
    </>
  )
}

export default Card