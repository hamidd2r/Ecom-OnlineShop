import "./App.css";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import NotFound from './component/layout/Header/NotFound.js'
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
import UpdateProfile from './component/User/UpdateProfile.js'
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess'
import Rozar from './component/Payment/Rozar.js'
import PaymentSuccess from './component/Payment/PaymentSuccess.js'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList'
import UpdateProduct from './component/Admin/UpdateProduct'
import ProcessOrder from './component/Admin/ProcessOrder'
import UsersList from './component/Admin/UsersList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews'
import axios from "axios";
import NewProduct from "./component/Admin/NewProduct";
import OrdersList from "./component/Admin/OrdersList";
import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
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
        <Route  path="/*" element={<NotFound/>}></Route>
        <Route  path="/useroption" element={<UserOptions/>}></Route>
        <Route  path="/rozar" element={<Rozar/>}></Route>
        <Route  path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
        
       


    



        {/* protected router */}
        <Route element = {<ProtectedRoute/>}>
        <Route element={<Dashboard/>} path='/admin/dashboard' exact />
        <Route element={<Cart/>} path='/cart' exact />
        <Route element={<ConfirmOrder/>} path='/order/confirm' exact />
        <Route element={<OrderDetails/>} path='/order/:id' exact />
        <Route element={<MyOrders/>} path='/orders' exact />
        <Route element={<OrderSuccess/>} path='/success' exact />
        <Route element={<UpdateProfile/>} path='/me/update' exact />
        <Route element={<Profile/>} path='/account' exact />
        <Route element={<Shipping/>} path='/shipping' exact />
        <Route element={<ProductList/>} path='/admin/products' exact />
        <Route element={<NewProduct/>} path='/admin/product' exact />
        <Route element={<UpdateProduct/>} path='/admin/product/:id' exact />
        <Route element={<OrdersList/>} path='/admin/orders' exact />
        <Route element={<ProcessOrder/>} path='/admin/order/:id' exact />
        <Route element={<UsersList/>} path='/admin/users' exact />
        <Route element={<UpdateUser/>} path='/admin/user/:id' exact />
        <Route element={<ProductReviews/>} path='/admin/reviews' exact />
        <Route element={<Payment/>} path='/process/payment' exact />

        </Route> 

      </Routes>
      <Footer />
    </>
  );
}

export default App;
