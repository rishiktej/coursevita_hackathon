import React from "react";
import "../../styles/Footer.css"; // Import the custom CSS file for footer
import { FaEnvelope } from "react-icons/fa"; // Import mail icon from react-icons

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="slogan">Course Vita</p>
        <div className="footer-bottom">
          <p className="footer-text">
            © 2024 Course Vita. All rights reserved.
          </p>
          <div className="contact-info">
            <FaEnvelope className="mail-icon" />
            <a href="mailto:teamdreamers@gmail.com" className="contact-email">
              teamdreamers@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
