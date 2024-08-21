import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState({});
  const [footer, setFooter] = useState({});
  const [social, setSocial] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-links`)
      .then((res) => res.json())
      .then((info) => setFooter(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social`)
      .then((res) => res.json())
      .then((info) => setSocial(info[0]));
  }, []);

  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info[0]));
  }, []);

  return (
    <>
      {/* <footer className="bg-dark text-light">
        <div className="container">
          <div className="f-items default-padding">
            <div className="row">
              <div className="col-lg-4 col-md-6 item">
                <div className="f-item about">
                  <img src={logo.logo} alt="Logo" />
                  <p>{footer.FooterAbout}</p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 item">
                <div className="f-item link">
                  <h4 className="widget-title">Quick LInk</h4>
                  <ul>
                    <li>
                      <Link to="/">
                        <i className="fas fa-angle-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us">
                        <i className="fas fa-angle-right" /> About us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact-us">
                        <i className="fas fa-angle-right" /> Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 item">
                <div className="f-item contact-widget">
                  <h4 className="widget-title">Contact Info</h4>
                  <div className="address">
                    <ul>
                      <li>
                        <div className="icon">
                          <i className="fas fa-home" />
                        </div>
                        <div className="content">
                          <strong>Address:</strong>
                          {contact.address}
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope" />
                        </div>
                        <div className="content">
                          <strong>Email:</strong>
                          <a href={`mailto:${contact.email}`}>
                            {contact.email}
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-phone" />
                        </div>
                        <div className="content">
                          <strong>Phone:</strong>

                          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p>{footer.CopyRight}</p>
              </div>
              <div className="col-lg-6 text-end link">
                <ul>
                  <li>
                    <Link to="/terms-condition">Terms</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
       
      </footer> */}
      <>
        <div className="cta-base">
          <div className="container">
            <div className="cta-base__wrapper border-bottom-dark">
              <div className="row align-items-center justify-content-center justify-content-md-between gutter-y-20">
                <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-7 col-10">
                  <div className="cta-base__text-block">
                    <h2 className="heading-md text-white">
                      Ready to grow your business digitally?
                    </h2>
                  </div>
                </div>
                <div className="col-xl-auto col-lg-4 col-md-5 col-xs-8 col-10">
                  <div className="cta-base__button">
                    <Link
                      to="/contact"
                      className="btn-masco rounded-pill btn-fill--up"
                    >
                      <span>Let's start the project</span>
                    </Link>
                    <div className="cta-base__button-shape">
                      <img src="/image/home-1/cta-shape.svg" alt="image alt" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer footer-padding-default footer--dark-v1">
          <div className="container">
            <div className="row row--footer-main">
              <div className="col-md-8 col-lg-7 col-xl-7 col-xxl-4">
                <div className="footer__content-block">
                  <div className="footer__content-text">
                    <div className="footer-brand">
                      <img src={logo.logo} alt="image alt" />
                    </div>
                    <p>
                      {footer.FooterAbout}
                    </p>
                  </div>

                  <br />
                  <ul className="list-social">
                    <li>
                      <a href={social.facebook} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-facebook-f" />
                      </a>
                    </li>
                    <li>

                      <a href={social.twitter} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-twitter" />
                      </a>
                    </li>
                    <li>

                      <a href={social.instragram} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>

                      <a href={social.youtube} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-youtube" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 col-xl-5 col-xxl-5 offset-xl-1">
                <div className="row row--list-block">
                  <div className="col-auto col-md-4 col-lg-auto col-xl-auto col-xxl-auto">
                    <h3 className="footer-title">Useful Links</h3>
                    <ul className="footer-list">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/terms-condition">Terms</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/terms-condition">Terms</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-auto col-md-4 col-lg-auto col-xl-auto col-xxl-auto">
                    <h3 className="footer-title">Our Information</h3>
                    <ul className="footer-list">
                      <li>
                        <a href={`mailto:${contact.email}`}>
                          {contact.email}
                        </a>
                      </li>
                      <li>
                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                      </li>
                      <li>
                        <p>{contact.address}</p>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-block">
            <div className="container">
              <div className="copyright-inner text-center copyright-border">
                <p>{footer.CopyRight}</p>
              </div>
            </div>
          </div>
        </div>
      </>


    </>
  );
};

export default Footer;
