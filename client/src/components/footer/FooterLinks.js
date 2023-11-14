import React from "react";
import "./FooterLinks.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/shopito_logo.png";

const FooterLinks = () => {
  return (
    <>
      <section className="contact-section">
        <div class="container contact">
          <div className="contact-icon">
            <FaFacebook className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>
          <h2>let us Talk</h2>
          <a href="#home" className="btn btn-dark">
            Make an enquiry
          </a>
        </div>
      </section>

      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
          </div>
          <div className="footer-menu-container">
            <div className="footer-menu">
              <p className="link-heading">Features</p>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#home">Link Shortening</a>
                </li>
                <li>
                  <a href="#home">branded links</a>
                </li>
                <li>
                  <a href="#home">Analytics</a>
                </li>
                <li>
                  <a href="#home">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <p className="link-heading">Resources</p>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#home">Link Shortening</a>
                </li>
                <li>
                  <a href="#home">branded links</a>
                </li>
                <li>
                  <a href="#home">Analytics</a>
                </li>
                <li>
                  <a href="#home">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <p className="link-heading">Company</p>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#home">Link Shortening</a>
                </li>
                <li>
                  <a href="#home">branded links</a>
                </li>
                <li>
                  <a href="#home">Analytics</a>
                </li>
                <li>
                  <a href="#home">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <p className="link-heading">Partners</p>
              <ul className="nav-ul footer-links">
                <li>
                  <a href="#home">Link Shortening</a>
                </li>
                <li>
                  <a href="#home">branded links</a>
                </li>
                <li>
                  <a href="#home">Analytics</a>
                </li>
                <li>
                  <a href="#home">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
