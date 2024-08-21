import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Setting = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);
  return (
    <>
      <section
        className="project s2 vh-100"
      
      >
        <div className="shape right" />
        <div className="container">
          <BackToAdminDashboard></BackToAdminDashboard>
          <div className="row justify-content-center gutter-y-default mt-5">

            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
          
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/14970/14970897.png" width={75} height={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/setting-general/" >
                      Logo Setting
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
           
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/6212/6212786.png" width={75} height={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/setting-footer" >
                      Footer Setting
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/8984/8984290.png" height={75} width={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/setting-payment" >
                      Payment Setting
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
           
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/1116/1116310.png" width={75} height={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <Link to="/admin/setting-homepage" >
                      HomePage Setting
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/7021/7021220.png" height={75} width={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    {contact.map((e) => (
                      <Link
                        to={`/admin/edit-contact-page/${e._id}`}
                      >
                        Contact Page Setting
                      </Link>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          
          </div>

        </div>
      </section>
    </>
  );
};

export default Setting;
