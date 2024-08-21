import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const About = () => {
  const { id } = useParams();
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));
  }, [id]);

  return (
    <>
      {abouts.map((about, index) => (
        <div
          key={about._id}
          className={`home-1_content-section-${index + 1} ${
            index % 2 === 0 ? "section-padding-120" : "padding-bottom-120"
          }`}
          id={`about-${index}`}
        >
          <div className="container">
            <div className="row row--custom">
              {index % 2 === 0 ? (
                <>
                  <div
                    className="offset-xl-1 col-lg-5 col-auto"
                  >
                    <div className="home-1_content-image-1 content-image--mobile-width">
                      <img
                        src={about.img}
                        alt="alternative text"
                      />
                      <div className="home-1_content-image-1-shape">
                        <img
                          src="./image/home-1/content-image-1-shape.svg"
                          alt="alternative text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-6 col-lg-7 col-md-10 col-auto"
                  >
                    <div className="content">
                      <div className="content-text-block">
                        <h2 className="content-title heading-md text-black">
                          {about.title}
                        </h2>
                        <p>{about.description}</p>
                        <ul className="content-list mt-3">
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointOne}
                          </li>
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointTwo}
                          </li>
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointThree}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="col-xl-5 col-lg-5 col-auto"
                  >
                    <div className="home-1_content-image-2 content-image--mobile-width">
                      <img
                        src={about.img}
                        alt="alternative text"
                      />
                      <div className="home-1_content-image-2-shape">
                        <img
                          src="./image/home-1/content-image-2-shape.svg"
                          alt="alternative text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="offset-xl-1 col-xl-6 col-lg-7 col-md-11"
                  >
                    <div className="content">
                      <div className="content-text-block">
                        <h2 className="content-title heading-md text-black">
                          {about.title}
                        </h2>
                        <p>{about.description}</p>
                        <ul className="content-list mt-3">
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointOne}
                          </li>
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointTwo}
                          </li>
                          <li className="content-list-item">
                            <img
                              src="./image/icons/icon-check-blue.svg"
                              alt="alternative text"
                            />
                            {about.pointThree}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default About;
