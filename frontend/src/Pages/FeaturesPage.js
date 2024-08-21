import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FeaturesPage = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setServices(info));
  }, [id]);

  return (
    <>
      
      <div className="home-1_service-section padding-bottom-120" id="feature">
        <div className="home-1_service-section-shape">
          <img src="./image/home-1/service-section-shape.svg" alt="image alt" />
        </div>
        <div className="container">
          <div className="home-1_service-section-wrapper">
            <div className="row justify-content-center">
              <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-9">
                <div className="section-heading text-center">
                  <h2 className="section-heading__title heading-md text-black">
                    All the digital services that are convenient for you
                  </h2>
                </div>
              </div>
            </div>
            <div className="row gutter-y-default justify-content-center">
              {
                services.map((e, index) =>
                  <div className="col-xl-6 col-lg-6 col-md-10">
                    <Link
                      className="service-card hvr-fill"
                    >
                      <div className="service-card__icon">
                        <img
                          src={e.featureImg}
                          alt={e.featureTitle}
                          className="inline-svg"
                        />
                      </div>
                      <div className="service-card__body">
                        <h3 className="service-card__title">
                          {e.featureTitle}
                        </h3>
                        <p>
                          {e.featureDesc}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
