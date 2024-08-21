import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useParams } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

const Testimonials = () => {
  const { id } = useParams();
  const [title, setTitle] = useState({});
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials/`)
      .then((res) => res.json())
      .then((info) => setTestimonials(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, [id]);

  return (
    <>
      {/* <div
        className="testimonials-area text-light shadow dark bg-fixed carousel-shadow default-padding"
        style={{ backgroundImage: "url(assets/img/shape/2.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2>
                  {title.titleOne} <br />
                  <>{title.titleTwo}</>
                </h2>
                <div className="devider" />
                <p>{title.titleTopText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="testimonial-items">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="testimonial-carousel owl-carousel owl-theme">
                  <AliceCarousel
                    mouseTracking
                    animationType="fadeout"
                    animationDuration={1500}
                    disableButtonsControls
                    infinite
                    items={testimonials.map((e, index) => (
                      <div className="item" key={index}>
                        <div className="provider">
                          <img src={e.personImg} width={100} alt="Author" />
                          <div className="content">
                            <h4>{e.personName}</h4>
                            <span>{e.personTitle}</span>
                          </div>
                        </div>
                        <div className="info">
                          <p>{e.desc}</p>
                        </div>
                        <div className="reason">
                          <h5>{e.subject}</h5>
                          <div className="rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    ))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div
        className="home-1_testimonial-section section-padding-120 bg-light-2"
        id="testimonial"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-9">
              <div className="section-heading text-center">
                <h2 className="section-heading__title heading-md text-black">
                  {title.titleOne}
                </h2>
              </div>
            </div>
          </div>
          <div className="testimonial-widget-large">
            <div className="row row--custom">
              <div
                className="col-lg-6 col-md-8 col-sm-10 col-xs-10"
              >
                <div className="testimonial-widget-large__image">
                  <img
                    src={title.img}
                    alt="handsome-smiling-bearded-man-glasses-working-laptop"
                  />
                </div>
              </div>
              <div
                className="col-lg-6 col-md-10 col-auto"
              >
                <div className="testimonial-widget-large__body">
                  <AliceCarousel
                    mouseTracking
                    animationType="fadeout"
                    animationDuration={1500}
                    disableButtonsControls
                    infinite
                    items={testimonials.map((e, index) => (
                      <>
                        <div className="testimonial-widget-large__icon">
                          <img
                            src="/image/home-1/testimonial-icon.svg"
                            alt="testimonial icon"
                          />
                        </div>
                        <p className="testimonial-widget-large__review-text">
                          {e.desc}
                        </p>
                        
                        <h4 className="testimonial-widget-large__user-name">
                          {e.personName}
                        </h4>
                        <span className="testimonial-widget-large__user-position">
                          {e.personTitle}
                        </span>
                        <div class="content-testimonial__user text-center">
                          <img className="rounded" src={e.personImg} width={75} height={75} alt="alternative text" />
                        </div>
                      </>
                    ))}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Testimonials;
