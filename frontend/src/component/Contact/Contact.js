import React, { useState } from "react";
import './contact.css'
import Button from '@mui/material/Button';
const Contact = () => {

  return (
    <>
  <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: hamid.ali@d2rtech.com</Button>
      </a>
    </div>
    </>
  );
};

export default Contact;
