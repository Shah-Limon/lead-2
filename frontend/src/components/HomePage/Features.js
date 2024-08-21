import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Features = () => {
  const { id } = useParams();
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));
  }, [id]);

  return (
    <>
      {/* <div className="about-style-three-area default-padding">
        <div className="container">
          {abouts.map((e, index) => (
            <div className="row" key={index}>
              <div
                className={`col-lg-6 ${index % 2 === 0 ? "order-lg-2" : ""}`}
              >
                <div className="about-style-three">
                  <div
                    className="shape"
                    style={{
                      backgroundImage: "url(assets/img/shape/border-line.svg)",
                    }}
                  />
                  <div className="thumb">
                    <img src={e.sliderImg} alt="Thumb" />
                  </div>
                </div>
              </div>

              <div
                className={`col-lg-6 ${index % 2 === 0 ? "order-lg-1" : ""}`}
              >
                <div className="about-style-three">
                  <div className="info">
                    <h2>{e.title}</h2>
                    <p>{e.description}</p>
                    <ul>
                      <li>
                        <h5>{e.pointOne}</h5>
                      </li>
                      <li>
                        <h5>{e.pointTwo}</h5>
                      </li>
                      <li>
                        <h5>{e.pointThree}</h5>
                      </li>
                      <li>
                        <h5>{e.pointFour}</h5>
                      </li>
                      <li>
                        <h5>{e.pointFour}</h5>
                      </li>
                      <li>
                        <h5>{e.pointFive}</h5>
                      </li>
                      <li>
                        <h5>{e.pointSix}</h5>
                      </li>
                    </ul>
                    <Link
                      className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                      to={e.btnUrl}
                    >
                      {e.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Features;
