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
      <Menu onClick={onClick} selectedKeys={[current]} theme="dark"  mode="horizontal" items={items} />
      <div className="overlay"></div>
      <button className="get-started-button" onClick={handleGetStarted}>
        <Link to='/register'>Get Mentor</Link>
      </button>
      <Carousel afterChange={onChange} autoplay>
        <div style={contentStyle}>
            <img 
              src='../../public/mentoring-coaching-tutor-guiding-helping-concept_53876-128048.jpg'
            style={{ width: '100%', height: '84vh', maxWidth: '100%' }}
            />
        </div>
        <div style={contentStyle}>
          <img
            src='../../public/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg'
            style={{ width: '100%', height: '84vh', maxWidth: '100%' }}
          />
        </div>
        <div style={contentStyle}>
          <img
            src='../../public/coaching-coach-development-educating-guide-concept_53876-124792.jpg'
            style={{ width: '100%', height: '84vh', maxWidth: '100%' }}
          />
        </div>
        <div style={contentStyle}>
          <img
            src='../../public/asian-businesspeople-talk-project-strategy-office-meeting-room_74952-2603.jpg'
            style={{ width: '100%', height: '82vh', maxWidth: '100%' }}
          />
        </div>
      </Carousel>
      <Footer />
    </>
  )
}

export default Landing