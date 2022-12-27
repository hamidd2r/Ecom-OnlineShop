import React from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PreviewIcon from '@mui/icons-material/Preview';
const Footer = () => {
  return (
    <>
     <footer>
      <div class="footer-container">
        <div class="left-col">
          <img src="logo.png" alt="" class="logo"/>
          <div class="social-media">
            <a href="#"><i class="fab fa-facebook-f"><FacebookIcon/></i></a>
            <a href="https://www.instagram.com/mdhamid370/"><i class="fab fa-twitter"><InstagramIcon/></i></a>
            <a href="https://github.com/hamidd2r"><i class="fab fa-instagram"><GitHubIcon/></i></a>
            <a href="https://www.linkedin.com/in/md-hamid-ali-b46474210/"><i class="fab fa-youtube"></i><LinkedInIcon/></a>
            <a href="https://vercel.com/dashboard"><i class="fab fa-linkedin-in"><PreviewIcon/></i></a>
          </div>
          <p class="rights-text">© 2022 Created By <b>mehamidali</b> All Reserved.</p>
        </div>
 
        <div class="right-col">
          <h1>Our Online Shop</h1>
          <div class="border"></div>
          <p>Enter Your Email to get our updates.</p>
          <form action="" class="newsletter-form">
            <input type="text" class="txtb" placeholder="Enter Your Email"/>
            <input type="submit" class="btn" value="submit"/>
          </form>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer