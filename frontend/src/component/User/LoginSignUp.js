import React, { Fragment, useEffect, useRef, useState } from 'react'
import './LoginSignup.css'
import Loader from '../layout/Loader/Loader'
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FaceIcon from '@mui/icons-material/Face';
import {useAlert} from 'react-alert'
import avatarPreview from '../../images/hamid.jpg'
import {useDispatch , useSelector} from 'react-redux';
import {clearErrors , login , register} from '../../actions/userActon'

const LoginSignUp = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state) => state.user);

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)


    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState("");

    const [user ,setUser] = useState({
      name:"",
      email:"",
      password:"",
    });

    const {name , email , password} = user;
    const {avatar , setAvatar} = useState("/hamid.jpg") //dot {}
    const [avatarPreview , setAvatarPreview] = useState("/hamid.jpg")

    const loginSubmit = (e) =>{
      e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    };

    const registerSubmit =(e)=>{
      e.preventDefault()

       const myForm = new FormData()

       myForm.set("name" , name)
       myForm.set("email" , email)
       myForm.set("password" , password)
       myForm.set("avatar" , avatar)
       dispatch(register(myForm));

    };

    const registerDataChange = (e) =>{

      if (e.target.name === "avatar") {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
            
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value})
      }

    };

    // const redirect = location.search ? location.search.split("=")[1] : "/account";
    useEffect(()=>{
     const isAuthenticated = localStorage.getItem("user")
      if(isAuthenticated){
        navigate('/')
      }

    }, [dispatch , navigate , isAuthenticated])

    const switcherTabs = (e , tab) => {
        
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
        };
  return (
    <>
     <Fragment>
      {/* {loading? <Loader/> */}
      :    <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={(e) => switcherTabs(e, "login") }>LOGIN</p>
                        <p onClick={(e) => switcherTabs(e, "register") }>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                    <MailOutlineOutlinedIcon/>
                        <input type="email"  placeholder='Enter Email'
                            required
                            value={loginEmail}
                           onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                     <LockOpenIcon/>
                     <input type="password"
                     placeholder='password'
                     required
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Link to="/password/forgot"> Forgot Password.. ?</Link>
                    <button className='loginbtn' type='submit'><LoginIcon/></button>
                    {/* <input type="submit" value={<LoginIcon/>} className='loginbtn' /> */}
                </form>




{/* register */}
                <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit"
                 value="Register"
                  className="signUpBtn" 
                
                  
                  />
              </form>

            </div>
        </div>
     </Fragment>
    </>
  )
}

export default LoginSignUp