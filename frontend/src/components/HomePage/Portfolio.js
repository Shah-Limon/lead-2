import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Portfolio = () => {
  const { id } = useParams();
  const [choose, setChoose] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/why-choose/${id}`)
      .then((res) => res.json())
      .then((info) => setChoose(info));
  }, [id]);
  return (
    <>
      {/* <div
        id="overview"
        className="overview-area relative relative default-padding bg-gray carousel-shadow"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2>Quick Software Overview</h2>
                <div className="devider" />
                <p>
                  Outlived no dwelling denoting in peculiar as he believed.
                  Behaviour excellent middleton be as it curiosity departure
                  ourselves very extreme future.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-full">
          <div className="row">
            <div className="col-lg-12">
              <div className="overview-carousel owl-carousel owl-theme">
               
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/dashboard/22.jpg" alt="Thumb" />
                    <a
                      href="assets/img/dashboard/22.jpg"
                      className="item popup-gallery theme video-play-button"
                    >
                      <i className="fa fa-plus" />
                    </a>
                  </div>
                  <div className="content">
                    <h4>
                      <span>01</span> App Integration
                    </h4>
                  </div>
                </div>
               
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/dashboard/33.jpg" alt="Thumb" />
                    <a
                      href="assets/img/dashboard/33.jpg"
                      className="item popup-gallery theme video-play-button"
                    >
                      <i className="fa fa-plus" />
                    </a>
                  </div>
                  <div className="content">
                    <h4>
                      <span>02</span> App Customization
                    </h4>
                  </div>
                </div>
                
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/dashboard/11.jpg" alt="Thumb" />
                    <a
                      href="assets/img/dashboard/11.jpg"
                      className="item popup-gallery theme video-play-button"
                    >
                      <i className="fa fa-plus" />
                    </a>
                  </div>
                  <div className="content">
                    <h4>
                      <span>03</span> App Modification
                    </h4>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="home-1_portfolio-section section-padding-120" id="portfolio">
        <div className="portfolio-shape">
          <img src="./image/home-1/portfolio-shape.png" alt="image alt" />
        </div>
        <div className="container">
          <div className="section-heading section-heading--row text-center text-md-initial">
            <div className="row">
              <div className="col-xl-6 col-md-8">
                <h2 className="section-heading__title heading-md text-black">
                  We create world-class web design, &amp; branding
                </h2>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="section-heading__button">
                  <a
                    href="portfolio.html"
                    className="btn-masco btn-masco rounded-pill btn-fill--up"
                  >
                    <span>See more works</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row row--portfolio-gutter">
            <div
              className="col-md-6 col-xs-10"
             
            >
              <a href="portfolio-details.html" className="portfolio-widget">
                <div className="portfolio-widget_image-block">
                  <img src="./image/home-1/porfolio-img2.png" alt="portfolio image" />
                </div>
                <div className="portfolio-widget__title-block">
                  <h3 className="portfolio-widget__title">
                    App — The power of communication
                  </h3>
                  <span className="portfolio-widget__category">UI/UX Design</span>
                </div>
                <div className="portfolio-widget__link">
                  <span className="btn-link btn-arrow">View work </span>
                </div>
              </a>
            </div>
            <div
              className="col-md-6 col-xs-10"
             
            >
              <a href="portfolio-details.html" className="portfolio-widget">
                <div className="portfolio-widget_image-block">
                  <img src="./image/home-1/porfolio-img1.png" alt="portfolio image" />
                </div>
                <div className="portfolio-widget__title-block">
                  <h3 className="portfolio-widget__title">
                    Website — The future lifestyle platform.
                  </h3>
                  <span className="portfolio-widget__category">Branding</span>
                </div>
                <div className="portfolio-widget__link">
                  <span className="btn-link btn-arrow">View work </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Portfolio;
