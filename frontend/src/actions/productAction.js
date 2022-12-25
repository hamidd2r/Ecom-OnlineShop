import axios from "axios";
import {
  All_PRODUCT_FAIL,
  All_PRODUCT_REQUEST,
  All_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  CLEAR_ERRORS, 
} from "../constants/productConstants";
   

export const getProduct = (currentPage=1 , price=[0,100000], category) => async (dispatch) => {
  try {
    dispatch({
      type: All_PRODUCT_REQUEST
    });

   

  let link = (`http://localhost:4000/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)

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


// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:4000/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//


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

//
// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };


    // const headers = { Authorization: localStorage.getItem('token') };
    // console.log(headers)
  

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/admin/product/new`,
      productData,
      config,
      // headers
   
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//
// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};




