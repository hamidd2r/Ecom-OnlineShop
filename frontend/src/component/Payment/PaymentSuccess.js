import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import './orderSuccess.css'
import { Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSearchParams } from 'react-router-dom'


const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0]
    const referenceNum = searchQuery.get('reference')

  return (
    <>
        <Box>
            <VStack h="100vh" justifyContent='center'>
            <Heading>Your Order has been Placed successfully</Heading>
           
            <Text>
                Reference No.{referenceNum}
            </Text>
            </VStack>
        </Box>
        <div className="orderSuccess">
           <CheckIcon />
            <Link to="/orders">View Orders</Link>
         </div>

      
    </>
  )
}

export default PaymentSuccess