import React from "react";
import { Link } from "react-router-dom";

const NewsLetterThank = () => {
  return (
    <>
      <section className="watch-video hight-full">
        <div className="shape" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center"></div>
              <div className="watch-video__main">
                <div className="main mt-15">
                  <h5> Thank you for subscribing to our newsletter! 🚀</h5>
                  <p>
                    We are thrilled to have you on board <br></br> and look
                    forward to keeping you informed and engaged with our
                    updates.{" "}
                  </p>
                  <img
                    className="mt-15"
                    style={{ borderRadius: "15px" }}
                    src="https://img.freepik.com/free-vector/newsletter-illustration-concept_114360-777.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetterThank;
