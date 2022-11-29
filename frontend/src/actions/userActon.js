import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST, 
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../constants/userConstants'
import axios from 'axios'

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
// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};