import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'

const Search = () => {
    const [product , setProduct] = useState()
    useEffect(()=>{
        getProducts()
    },[])

    const getProducts= async ()=>{
        let result = await fetch('http://localhost:4000/api/v1/admin/products' , {
          headers:{
            authorization: ` bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setProduct(result)
    }
    const searchHandle = async(e) =>{
      let key = e.target.value;
      if(key){
        const data = await fetch(`http://localhost:4000/api/v1/products/${key}`)
        data = await data.json();
        if(data){
          setProduct(data)
        }
      } else {
        getProducts()
      }
    
    }
  return (
    <>
        <form className='searchBox'>
        <input type="text"
       onChange={searchHandle}
        placeholder='Search a Product...'
       
         />
<input type="submit" value="search"
 />
        </form>
    </>
  )
}

export default Search