import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  let isAuthenticated = {'token':localStorage.getItem('token')}

  console.log(isAuthenticated)
  return (
    
    isAuthenticated.token ? <Outlet/> : <Navigate to='/login'/>
    
  )
}

export default ProtectedRoute