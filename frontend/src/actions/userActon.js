import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    LOGOUT_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    LOGOUT_FAIL
} from '../constants/userConstants'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

// login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });
        const config = { 
            headers: {
                "Content-Type": "application/json"
            }
        };
        const {
            data
        } = await axios.post(`http://localhost:4000/api/v1/login`, {
            email,
            password
        }, config);
        if(data.auth){
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", JSON.stringify(data.auth))
            
        }

        else {
            alert("please enter correct details.")
        }
       


        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
};

// register.............
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const {
            data
        } = await axios.post(`http://localhost:4000/api/v1/register`, userData, config);
        localStorage.setItem("user", JSON.stringify(data))
        localStorage.setItem("token", JSON.stringify(data.auth))
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Load..User
 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });
        const {
            data
        } = await axios.get(`http://localhost:4000/api/v1/me`);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
};



// logout UsER...
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`http://localhost:4000/api/v1/logout`);
        
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
};

//Upadte Profile.. User.
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const {
            data
        } = await axios.put(`http://localhost:4000/api/v1/me/update`, userData, config);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        });
    }
};


// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`http://localhost:4000/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };

  // get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
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