import React, { useEffect } from 'react'
import Slidebar from './Slidebar.js'
import  './dashboard.css'
import { getAdminProduct , clearErrors } from '../../actions/productAction'
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux'
import { Doughnut  , Line} from 'react-chartjs-2'; 
import {Chart, ArcElement} from 'chart.js'
import {CategoryScale} from 'chart.js'; 
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userActon.js';
Chart.register(ArcElement,CategoryScale);


const Dashboard = () => {

  const dispatch = useDispatch()

  const {products} = useSelector((state) => state.products)
  const {orders} = useSelector((state) => state.allOrders)
  const {error , users} = useSelector((state) => state.allUsers)

  let outOfStock = 0
  products && 
  products.forEach(item => {
    if(item.Stock === 0){
      outOfStock +=1
    }
    
  });


  useEffect(()=>{
   

    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())


  },[dispatch])

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 400 , 30],
          },
        ],
      };


    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock , products.length - outOfStock],
          },
        ],
      };

      


  return (
    <>
        <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Slidebar />
      <div className="dashboardContainer">
    <Typography component="h1">Dashboard</Typography>
    <div className="dashboardSummary">
        <div>
            <p>
                total amount <br /> 2000
            </p>
        </div>

        <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
            </Link>

            <Link to="/admin/products">
            <p>Order</p>
            <p>{orders && orders.length}</p>
            </Link>

            <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
            </Link>
        </div>
    </div>


     {/* <div className="lineChart">
          <Line data={lineState} />
        </div>  */}
 


        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

      
      </div>
      </div>

    </>
  )
}

export default Dashboard