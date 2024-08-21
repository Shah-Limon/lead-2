import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {

  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);


  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, []);

  return (
    <>
      <div className="pricing-2_main_pricing-section section-padding-120">
        <div className="container">
          <div className="row text-center justify-content-center">
            <div className="col-xxl-6 col-lg-7 col-md-9">
              <div className="section-heading">
                <h2 className="section-heading__title heading-md mb-5">
                  {title.titleOne}
                </h2>
                <p className="mb-5">{title.description}</p>
              </div>
            </div>
          </div>
          <div
            className="row row--custom gutter-y-30"
            data-plan-id="pricing-1"
          >
            {
              packages.map((e, index) =>
                <div
                  className="col-lg-4 col-md-6"
                  key={index}
                >
                  <div className="pricing-card active">
                    <div className="pricing-card__head">
                      <h3 className="pricing-card__plan">{e.packageName}</h3>
                      <h3 className="pricing-card__price-block">
                        $
                        <span
                          className="pricing-card__price dynamic-value"
                        >
                          {e.price}
                        </span>

                      </h3>
                      <p>Total Credits: {e.totalCredits}</p>
                    </div>
                    <div className="pricing-card__body">
                      <ul className="pricing-card__list">
                        <li>{e.pointOne}</li>
                        <li>{e.pointTwo}</li>
                        <li>{e.pointThree}</li>
                        <li>{e.pointFour}</li>
                        <li>{e.pointFive}</li>
                        <li>{e.pointSix}</li>
                      </ul>
                      <div className="pricing-card__button">
                        <Link to={`/package/${e._id}`} className="btn-masco rounded-pill w-100">
                          Purchase now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
