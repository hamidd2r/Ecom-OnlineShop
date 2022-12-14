import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Loader from "../layout/Loader/Loader";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FaceIcon from "@mui/icons-material/Face";
import { useAlert } from "react-alert";
import avatarPreview from "../../images/hamid.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../../actions/userActon";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from '../layout/MetaData'

const UpdateProfile = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/hamid.jpg");
  const [avatarPreview, setAvatarPreview] = useState("/hamid.jpg");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    //    const isUpdated = localStorage.getItem("user")

    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setAvatar(user.avatar.url);
    }

    if (isUpdated) {
      navigate("/account");
    }

    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }, [dispatch, navigate, user, isUpdated]);

  return (
    <>
     {loading ? <Loader /> :
     <Fragment>
      <MetaData  title='update profile' />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
          <h2 className="updateProfileHeading" >Update Profile</h2>
          <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) =>setName(e.target.value)}

                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit"
                
                  className="updateProfileBtn" 
                
                  
                  />
              </form>
          </div>
        </div>

      </Fragment>
     }
    </>
  );
};

export default UpdateProfile;
