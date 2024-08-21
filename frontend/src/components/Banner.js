import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";
import { TypeAnimation } from "react-type-animation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, []);
  ;


  return (
    <>
      {
        banner.map(e =>

          <div className="home-1_hero-section" id="hero">
            <div className="home-1_hero-shape-1">
              <img src="./image/home-1/hero-shape-1.svg" alt="image alt" />
            </div>
            <div className="home-1_hero-shape-2">
              <img src="./image/home-1/hero-shape-2.svg" alt="image alt" />
            </div>
            <div className="container">
              <div className="row row--hero-content">
                <div
                  className="col-xxl-auto col-lg-6 col-md-7 col-sm-8 col-10"
                >
                  <div className="home-1_hero-image-block">
                    <div className="home-1_hero-image">
                      <img src={e.bannerImage} alt="hero image" />
                      <a
                        href={e.youtube}
                        data-fancybox=""
                        className="btn-play btn-play absolute-center"
                      >
                        <i className="fa-solid fa-play" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xxl-auto col-lg-6 col-md-10"
                >
                  <div className="home-1_hero-content">
                    <div className="home-1_hero-content-text">
                      <h1 className="hero-content__title heading-xxl">
                        {e.bannerHeadingText1}
                      </h1>
                      <h2 className="hero-content__title section-heading__title heading-md text-black">
                        <TypeAnimation
                          sequence={[
                            e.typingHeading1,
                            1000,
                            e.typingHeading2,
                            1000,
                            e.typingHeading3,
                            1000,
                          ]}
                          wrapper="span"
                          speed={50}
                          repeat={Infinity}
                        />
                      </h2>
                      <p>
                        {e.bannerText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }


    </>
  );
};

export default Banner;
