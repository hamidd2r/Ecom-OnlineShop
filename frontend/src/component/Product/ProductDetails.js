import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";

  
const ProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  const options = {
    value:5,
    size: "large",
    readOnly: true,
    isHalf:true,
    precision: 0.5,
  };

 const [quantity , setQuantity] = useState(1)
 const [open , setOpen] = useState(1)
 const [rating , setRating] = useState(1)
 const [comment , setComment] = useState(1)

  
const decreasequantity =()=>{
  if(1 >= quantity) return
  const qty = quantity - 1;
  setQuantity(qty)
}

const increasequantity =()=>{
  // if(product.Stock <= quantity) return

  const qty = quantity + 1;
  setQuantity(qty)
}




const addToCartHandler = () =>{
  dispatch(addItemsToCart(id,quantity))
  alert("add successfully .....")
}


const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true)
  

}

const reviewSubmitHandler = () =>{
  navigate("/products")

  // const myForm = new FormData()

  // myForm.set("rating" , rating)
  // myForm.set("comment" , comment)
  // myForm.set("productId" , id)

  // dispatch((myForm))
}

useEffect(() => {
  if(error) {
      alert.error(error) 
      dispatch(clearErrors())
  }
  dispatch(getProductDetails(id));
}, [dispatch, id]);



  return (
    <>
    <MetaData title={`${product.name} -- E-COM`}/>
      <div className="ProductDetails">
        <div>
          {/* <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  src={item.images}
                />
              ))}
          </Carousel> */}
          <img className="CarouselImage" src={product.images} alt="" />
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>product # {product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <ReactStars {...options} />{" "}
            <span> ({product.numOfReviews} Reviews) </span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreasequantity}>-</button>
                <input type="number" readOnly value={quantity} />
                <button style={{marginLeft:"-15px"}} onClick={increasequantity}>+</button>
              </div>{" "}
              <button 
              disabled={product.Stock <1 ? true : false}
               onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>
             
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <button onClick={submitReviewToggle} className="submitReview">submit Review</button>
        </div>
      </div>


      <h3 className="reviewHeading">REVIEW</h3>

      <Dialog aria-labelledby="simple-dialog-title"
      open={open}
      onClose={submitReviewToggle}
      >
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent className="submitDialog">
      <Rating
      onChange={(e) => setRating(e.target.value)}
        value={rating}
        size="large"
      />

      <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}>
      </textarea>
     
      </DialogContent>
      <DialogActions>
        <Button style={{color:"red"}} onClick={submitReviewToggle}>Cencel</Button>
        <Button onClick={reviewSubmitHandler}>Submit</Button>
      </DialogActions>
      </Dialog>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
        {product.reviews &&
        product.reviews.map((review) => <ReviewCard review= {review} />)}

        </div>
        ) : (
            <p className="noReviews">No Reviews</p>
        )
      }
      
      {/* <ReviewCard/> */}
    </>
  )
}


export default ProductDetails;
