import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

 
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if(error) {
        alert.error(error)
        dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    // edit:false,
    // color:"rgba(20,20,20,0.1)",
    // activeColor:"tomato",
    // value:product.ratings,
    value:5,
    size: "large",
    readOnly: true,
    isHalf:true,
    precision: 0.5,
  };
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
                <button>-</button>
                <input type="number" value="1" />
                <button>+</button>
              </div>{" "}
              <button>Add to Cart</button>
            </div>
            <p>
              {" "}
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <button className="submitReview">submit Review</button>
        </div>
      </div>


      <h3 className="reviewHeading">REVIEW</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
        {product.reviews &&
        product.reviews.map((review) => <ReviewCard review= {review} />)}
        </div>
        ) : (
            <p className="noReviews">No Reviews</p>
        )
      }
      
      <ReviewCard/>
    </>
  )
}


export default ProductDetails;
