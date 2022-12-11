import { Button } from '@mui/material'
import React from 'react'
import "./productReviews.css";
import MetaData from '../layout/MetaData'
import Slidebar from './Slidebar'

const ProductReviews = () => {
  return (
    <>
    
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <Slidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
             
              <input
                type="text"
                placeholder="Product Id"
                required
              
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
             
            >
              Search
            </Button>
          </form>

         
        </div>
      </div>
   
    </>
  )
}

export default ProductReviews