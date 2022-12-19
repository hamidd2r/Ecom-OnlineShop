import React from 'react'
import './About.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom'
import { Avatar, Button, Typography } from '@mui/material';

// import About from '../components/About'
 


const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/mdhamid370/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
 
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media-exp1.licdn.com/dms/image/D4D03AQErRD2-QdJjsw/profile-displayphoto-shrink_800_800/0/1666006884322?e=1676505600&v=beta&t=8JA7F3sb5d13M-nY70j2nWduEnuZxTOfL1hB0rlbJmc"
              alt="Founder"
            />
            <Typography>Md Hamid Ali</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @mehamidali. Only with the
              purpose to teach MERN Stack trainig by D2R Technology 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Social Accounts</Typography>
            <a
              href="https://studio.youtube.com/channel/UCJJLwV3a3CCGIuDPR0466yg"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/mdhamid370/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/md-hamid-ali-b46474210/" target="blank">
              <LinkedInIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;