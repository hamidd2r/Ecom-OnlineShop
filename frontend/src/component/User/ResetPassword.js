import React from 'react'
import './ResetPassword.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { resetPassword , clearErrors  } from '../../actions/userActon';
import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate()

  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert("error");
        dispatch(clearErrors());
      }
  
      if (success) {
        alert("Password Updated Successfully");
  
        navigate("/login");
      }
    }, [dispatch, error, alert, success]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
  
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default ResetPassword;