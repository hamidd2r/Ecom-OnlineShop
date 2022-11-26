import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import MetaData from "../layout/MetaData";

const categories = [
  "laptop",
  "shoes",
  "table",
  "mobile",
  "Shirt",
  "t-Shirt",
  "Video Games",
  "Headphones",
  "Mixer Grinders",
  "Smart Technology",
  "Home And Kichen",
  "Musical Instruments",
  "Industrial & Scientific"
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
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
          valueLabelDisplay="on"
          aria-label="range-slider"
          min={0}
          max={100000}
        ></Slider>

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        {/* rating for..7:14minute */}

        <fieldset>
          <Typography component="legend">Rating Above</Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating);
            }}
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
            valueLabelDisplay="auto"
          />
        </fieldset>
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
