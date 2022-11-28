import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">E-OnlineShop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Product</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li style={{marginLeft:"500px"}} className="nav-item ">
          <NavLink className="nav-link" to="/login"><AccountCircleIcon/></NavLink>
        </li>

        <li style={{marginLeft:"50px"}} className="nav-item ">
          <NavLink className="nav-link" to="/login"><ShoppingCartSharpIcon/></NavLink>
        </li>

        <li style={{marginLeft:"40px"}} className="nav-item ">
          <NavLink className="nav-link" to="/search"><SearchIcon/></NavLink>
        </li>
        
      </ul>
     
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar