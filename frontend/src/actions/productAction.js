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
   

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: All_PRODUCT_REQUEST
    });

  
    const 
   {   data }
     = await axios.get("http://localhost:4000/api/v1/products");
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




