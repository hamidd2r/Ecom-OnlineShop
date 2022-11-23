import './App.css';
import Header from './component/layout/Header/Header.js'
import { Route , Routes} from "react-router-dom"
import WebFont from 'webfontloader'
import { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';

function App() {

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto" , "Droid Sans" , "Chilanka"]
      }
    })
  })
  return (
  
   <>
    <Header/>
    
   <Routes>
  
  
   <Route path='/' element={<Home/>}></Route>
   <Route path='/product/:id' element={<ProductDetails/>}></Route>
   <Route path='/products' element={<Products/>}></Route>
 
   
   </Routes>
   <Footer/>

   </>
  ); 
}

export default App;
