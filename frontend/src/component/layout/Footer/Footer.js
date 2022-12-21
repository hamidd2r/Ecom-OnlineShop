import React from 'react'
import './Footer.css'
import playStore from "../../../../src/images/pic.jpg";
import appStore from "../../../../src/images/pic5.png";
const Footer = () => {
  return (
    <>
       <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img style={{borderRadius:"20px"}} src={playStore} alt="playstore" />
        <img style={{borderRadius:"20px"}} src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>E-Commerce</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; mealihamid</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/mdhamid370/">Instagram</a>
        <a href="http://youtube.com/">Youtube</a>
        <a href="http://instagram.com/">Facebook</a>
      </div>
    </footer>

    </>
  )
}

export default Footer