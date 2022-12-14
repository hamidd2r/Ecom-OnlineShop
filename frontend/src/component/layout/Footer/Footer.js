import React from 'react'
import './Footer.css'
import appStore from "../../../images/pic5.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PreviewIcon from '@mui/icons-material/Preview';
const Footer = () => {
  return (
    <>
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
       
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Apna OnlineShop.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; MeHamidAli</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#"><i class="fab fa-facebook-f"><FacebookIcon/></i></a>
            <a href="https://www.instagram.com/mdhamid370/"><i class="fab fa-twitter"><InstagramIcon/></i></a>
            <a href="https://github.com/hamidd2r"><i class="fab fa-instagram"><GitHubIcon/></i></a>
            <a href="https://www.linkedin.com/in/md-hamid-ali-b46474210/"><i class="fab fa-youtube"></i><LinkedInIcon/></a>
            <a href="https://vercel.com/dashboard"><i class="fab fa-linkedin-in"><PreviewIcon/></i></a>
      </div>
    </footer>
    </>
  )
}

export default Footer