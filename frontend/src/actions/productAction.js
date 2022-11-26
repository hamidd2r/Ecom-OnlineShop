import axios from "axios";
import {
  All_PRODUCT_FAIL,
  All_PRODUCT_REQUEST,
  All_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstants";
   

export const getProduct = (currentPage=1 , price=[0,100000], category) => async (dispatch) => {
  try {
    dispatch({
      type: All_PRODUCT_REQUEST
    });

  let link = `http://localhost:4000/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

  if(category){
    link= `http://localhost:4000/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
  }
    const 
   {   data }
     = await axios.get(link);
    dispatch({
      type: All_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: All_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// getProduct Details...
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    const {
      data
    } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};




