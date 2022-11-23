import React, { useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";

const Products = () => {
  const dispatch = useDispatch();

  const { products, productsCount } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct);
  }, [dispatch]);

  return (
    <>
      <h2 className="productsHeading">Products</h2>
      <div className="products">
      {
          products && products.map(product=>(
            <ProductCard product={product}/>
          ))
         }
      </div>
    </>
  );
};

export default Products;
