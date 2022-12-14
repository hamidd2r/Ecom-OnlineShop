import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import React, { useState } from "react";
import './Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userActon";
import { useDispatch , useSelector} from "react-redux";

const UserOptions = ({ user }) => {

  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <DashboardIcon />, name: "Dashboard", func: dashboard },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  // if (user.role === "admin") {
  //   options.unshift({
  //     icon: <DashboardIcon />,
  //     name: "Dashboard",
  //     func: dashboard,
  //   });
  // }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  

  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
    // window.location.reload();

    alert("Logout Successfully");
  }

  return ( 
    <>
    <Backdrop open={open} style={{zIndex:"10"}}
    />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{zIndex:"11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src="https://media-exp1.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_400_400/0/1666006884322?e=1675296000&v=beta&t=aVYxPU6mOqTkI0O1P8h6XMC8p8Jrt44RIr9J12Db34Y"
          ></img>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
