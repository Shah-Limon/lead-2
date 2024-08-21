import React from "react";
import { Link } from "react-router-dom";

const ContactMessageSuccessMessage = () => {
  return (
    <>
      <section className="watch-video">
        <div className="shape" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                
              </div>
              <div className="watch-video__main">
                <div className="main mt-15">
                  <h5>Your Message Has Been Successfully Submitted 🚀</h5>
                  <p>
                  Thank you for submitting your message. We will be in touch soon.{" "}
                  </p>
                  <img
                  className="mt-15"
                    style={{ borderRadius: "15px" }}
                    src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148889375.jpg?w=400"
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

export default ContactMessageSuccessMessage;
