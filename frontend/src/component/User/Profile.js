import React, { useEffect } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Navbar from "../layout/Header/Navbar";

import { useSelector } from 'react-redux'

const Profile = () => {

  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state) => state.user)
  console.log(user)
  
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login')
    }
  }, [isAuthenticated])
  return (
    <>
    <div className='kuchbhi'>

      <MetaData title="user profile" />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src="https://media-exp1.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_400_400/0/1666006884322?e=1675296000&v=beta&t=aVYxPU6mOqTkI0O1P8h6XMC8p8Jrt44RIr9J12Db34Y" />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Profile
