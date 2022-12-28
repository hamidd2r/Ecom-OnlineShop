import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const categories = [
  ["laptop","https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/16-5620/media-gallery/notebook-inspiron-16-5620-2-in-1-gy-fpr-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=598&qlt=100,1&resMode=sharp2&size=598,402&chrss=full"],
  ["shoes","https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/v/a/o/-original-imagg6reznfbmjfe.jpeg?q=70"],
  ["table","https://www.shutterstock.com/image-illustration/folding-table-3d-illustration-on-260nw-1922420468.jpg"],
  ["mobile","https://m.media-amazon.com/images/I/71KCwNV6MuL._SL1500_.jpg"],
  ["Shirt","https://5.imimg.com/data5/LQ/ZC/WF/SELLER-61376355/men-white-shirts-250x250.jpg"],
  ["t-Shirt","https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-mens-white-t-shirts-1-1634727108.jpg"],
  ["Video Games","https://media.istockphoto.com/id/641123366/photo/joystick-on-white-background.jpg?s=612x612&w=0&k=20&c=t51G-NaM9pO-f0wqf7unzUFhK-DeaH8_W6ZIYeiGqx4="],
  ["Mixer Grinders","https://cdn.shopify.com/s/files/1/0569/0916/8832/products/2_6f1d69fa-9920-454e-89d3-3e4199bba963_1024x1024@2x.jpg?v=1623932482"],
  ["Smart Technology","https://media.istockphoto.com/id/841828528/vector/night-skyscrapers-city.jpg?s=170667a&w=is&k=20&c=9W5uBKmaB4GjS2p89GyIjfyOKtTc1v6zSkMebQxvM5I="],
  ["Home And Kichen","https://images.thdstatic.com/lifestyleimages/1024x682/ed6b4ae8-6b05-4d09-8cb1-57cc5040bdba58.jpeg"],
  
];  

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    }
  };
  // const { id } = useParams();
  const { products, productsCount, resultPerPage, filterProductsCount } =
    useSelector((state) => state.products);

  // const keyword = id.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, price, category));
  }, [dispatch, currentPage, price, category]);

  return (
    <>
    <MetaData title="PRODUCTS E-COM"/>
<div className="my-slider">

    <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  //autoPlay={this.props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet"]}
  //deviceType={this.props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
{categories.map((category) => (
  <div
              className="category-link"
              key={category[0]}
              onClick={() => setCategory(category[0])}
            >
              
              <img className="images" src={category[1]} /><br />
              {category[0]}
              </div>
  ))}
</Carousel>
</div>
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"

          aria-label="range-slider"
          min={0}
          max={100000}
        ></Slider>

      </div>

      {resultPerPage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default Products;
