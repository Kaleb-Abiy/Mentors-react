import React, { useState } from 'react'
import MainLayout from '../layout/Layout'
import { Link } from 'react-router-dom'
import { Carousel, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './Landing.css'
import Footer from '../components/Footer';

const contentStyle = {
  margin: 0,
  height: '70vh',
  width: 'auto',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const items = [
  {
    label: 'Mentors',
    key: 'mentors',
    icon: <MailOutlined />,
  },
];


function Landing() {
  const [current, setCurrent] = useState('mail');


  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const handleGetStarted = () => {
    // Add logic for the "Get Started" button click
    console.log('Get Started button clicked!');
  };

  return (
    <>
      <div className="nav">
        <div className="logo_container">
          <li className='logo'>Mentors</li>
        </div>
        <div className="auth_links">
          <li> <Link className='auth_link' to="/register">Sign up</Link></li>
          <li> <Link className='auth_link'  to="/login">Sign in</Link></li>
        </div>
      </div>
      <div className="landing_container">
        <h2>
          Find the right mentor for you
        </h2>
      </div>
        <div className="action_button">
          <div className="action_text">
            <div className="action_link">
              <h1><Link className="start_link" to="/register">Get Started</Link> </h1>
            </div>
          </div>
        </div>

        <div className="features_container">
          <div className="left_container">
          <svg xmlns="http://www.w3.org/2000/svg" height="94" viewBox="0 -960 960 960" width="94"><path d="M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45L940-76l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38H120Zm320-480Zm-33 400Z" /></svg>
            <p className='feature_title'>Find mentors</p>
            <p>Navigate through available mentors and choose a mentor that mtaches your need with hourly rate and skills</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="94" viewBox="0 -960 960 960" width="94"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" /></svg>
          <p className='feature_title'>online payment</p>
          <p>Pay for mentorship service using an online payment gateway</p>
          </div>

          <div className="right_container">
          <svg xmlns="http://www.w3.org/2000/svg" height="94" viewBox="0 -960 960 960" width="94"><path d="M360-320q-17 0-28.5-11.5T320-360v-80q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520v-80q0-17 11.5-28.5T360-640h240q17 0 28.5 11.5T640-600v80q-17 0-28.5 11.5T600-480q0 17 11.5 28.5T640-440v80q0 17-11.5 28.5T600-320H360Zm120-60q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6ZM280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z" /></svg>
          <p className='feature_title'>Book mentors</p>
          <p>Select appointment time based on the mentors availability</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="94" viewBox="0 -960 960 960" width="94"><path d="M360-320h80v-120h120v-80H440v-120h-80v120H240v80h120v120ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" /></svg>
          <p className='feature_title'>Genrate Link</p>
          <p>Get zoom link for mentorship session after paying for the service</p>
          </div>
        </div>

        <div className="footer_container">
          <div className='copy_rigth_container'>
            <p className='copy_right'>© 2024 Mentors. All rights reserved</p>
          </div>

          <div className="made_text_container">
           <p className='made_text'>Made with ♡ by <a target="_blank" href="https://kaleb-abiy.netlify.app">Kaleb</a></p>
          </div>

          <div className="socials_container">
          <a
            href="https://twitter.com/caleb_abiy"
            target='_blank'
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg height="20" viewBox="0 0 30 30" fill="currentColor">
              <circle cx="15" cy="15" r="4" />
              <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
            </svg>
          </a>
          <a
            href="/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" height="20">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </a>
          </div>
        </div>
  
    
    </>
  )
}

export default Landing