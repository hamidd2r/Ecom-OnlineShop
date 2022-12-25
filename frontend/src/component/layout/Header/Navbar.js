import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom'
import './Nav.css'

const Navbar = () => {

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };







  const isAuthenticated = localStorage.getItem("user")
 
  return (
    <>
       <nav style={{marginTop:"0px" , background:"gray"}} className="navbar navbar-expand-lg navbar-dark " >
  <div className="container-fluid">
    <a href="#"><img className="speedDialIcon" src="data:image/jpeg;base64,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" alt="" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="">Home</NavLink>
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

        <form style={{marginLeft:"300px"}} class="d-flex" onSubmit={searchSubmitHandler}   onChange={(e) => setKeyword(e.target.value)}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit" value="Search">Search</button>
      </form>

      


        <li style={{marginLeft:"10px"}} className="nav-item ">
          <NavLink className="nav-link" to="/account"><AccountCircleIcon/></NavLink>
        </li>

        <li style={{marginLeft:"50px"}} className="nav-item ">
          <NavLink  className="nav-link" to="/cart"><ShoppingCartSharpIcon/></NavLink>
        </li>

        {/* <li style={{marginLeft:"40px"}} className="nav-item ">
          <NavLink className="nav-link" to="/search"><SearchIcon/></NavLink>
        </li> */}

      
      </ul>
{/*      
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      */}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar