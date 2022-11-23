import React from 'react'
import ReactStars from "react-rating-stars-component";
import pic from '../../images/hamid.jpg'
const ReviewCard = (review) => {


    const options = {
        // edit:false,
        // color:"rgba(20,20,20,0.1)",
        // activeColor:"tomato",
        // value:review.rating,
        size: "large",
     
        isHalf:true,
       
      };

  return (
    <>
        <div className="reviewCard">
        <img src={pic} alt="" />
        <p>{review.name}</p>
        <ReactStars {...options} />
            <span>Add Reviews </span>


        </div>
  
    </>
  )
}

export default ReviewCard