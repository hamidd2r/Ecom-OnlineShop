import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Navbar from "./component/layout/Header/Navbar";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import About from "./component/About/About.js";
import Contact from "./component/Contact/Contact";
import store from "./store";
import { loadUser } from "./actions/userActon";
import Profile from "./component/User/Profile.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from './component/User/UpdateProfile.js'
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList'
import UpdateProduct from './component/Admin/UpdateProduct'
import ProcessOrder from './component/Admin/ProcessOrder'
import UsersList from './component/Admin/UsersList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import NewProduct from "./component/Admin/NewProduct";
import OrdersList from "./component/Admin/OrdersList";
 

function App() {
   


  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey , setStripeApiKey] = useState("")


  async function getStripeApiKey() {
    const {data} = await axios.get("http://localhost:4000/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      {/* <Header/> */}
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}

     
      <Routes>
     
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        {/* <Route element={<ProtectedRoute/>}> */}
        <Route path="/account" element={<Profile/>}></Route>
        <Route path="/me/update" element={<UpdateProfile/>}></Route>
        <Route path="/shipping" element={<Shipping/>}></Route>
        <Route path="/order/confirm" element={<ConfirmOrder/>}></Route>
        <Route path="/success" element={<OrderSuccess/>}></Route>
        <Route path="/orders" element={<MyOrders/>}></Route>
        <Route path="/order/:id" element={<OrderDetails/>}></Route>
        <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route isAdmin={true} path="/admin/products" element={<ProductList/>}></Route>
        <Route isAdmin={true} path="/admin/product" element={<NewProduct/>}></Route>
        <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>}></Route>
        <Route isAdmin={true} path="/admin/orders" element={<OrdersList/>}></Route>
        <Route isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>}></Route>
        <Route isAdmin={true} path="/admin/users" element={<UsersList/>}></Route>
        <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>}></Route>
        <Route isAdmin={true} path="/admin/reviews" element={<ProductReviews/>}></Route>
      
        {/* </Route> */}
      

        {/* <Route path="/profile" element={<Profile />}></Route> */}
     
        <Route path="/process/payment" element={<Payment/>}></Route>
    
     
{/* {stripeApiKey && (
  <Elements stripe={loadStripe(stripeApiKey)}>

        <Route path="/process/payment" element={<Payment/>}></Route>

  </Elements>
)} */}
       
      </Routes>
      
     
 
      <Footer />
    </>
  );
}

export default App;
