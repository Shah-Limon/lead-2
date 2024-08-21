import React from "react";
import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <>
      <section className="error-section bg-light-2">
        <div className="container">
          <div className="row justiFfy-content-center">
            <div className="col-lg-12 col-sm-12 col-xs-12 col-12">
              <div className="error-content">
                <div className="error-content__image">
                  <img src="/image/404.png" alt="image alt" />
                </div>
                <h2 className="heading-md text-black">Page not found</h2>
                <p>
                  The requested URL you are looking for doesn’t exist on this server.
                </p>
                <div className="error-content__button">
                  <Link to="/" className="btn-masco btn-primary rounded-pill">
                    Back to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ErrorPage;
