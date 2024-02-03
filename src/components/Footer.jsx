
import React from 'react';
import './styles.css'; 

const Footer = () => {
    return (
        <div className="footer">
            Made with <span style={{ color: 'red', marginRight: '5px' }}>&hearts;</span> by Kaleb |
            <a href="https://twitter.com/caleb_abiy" target="_blank" rel="noopener noreferrer">
                Twitter
            </a>
            <a href="https://github.com/Kaleb-Abiy" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
            <a href="https://linkedin.com/in/Kaleb-Abiy" target="_blank" rel="noopener noreferrer">
                Linkedin
            </a>
        </div>
    );
};

export default Footer;
