import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const HomaPageSetting = () => {

  const [about, setAbout] = useState([]);
  const [banner, setBanner] = useState([]);
  const [speciality, SetSpeciality] = useState([]);
  const [choose, SetChoose] = useState([]);
  const [road, SetRoad] = useState([]);
  const [title, setTitle] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about`)
      .then((res) => res.json())
      .then((info) => setAbout(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/speciality/`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/why-choose/`)
      .then((res) => res.json())
      .then((info) => SetChoose(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/road/`)
      .then((res) => res.json())
      .then((info) => SetRoad(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/team-title`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setFeatures(info));
  }, []);

  return (
    <div>
      <section className="participants vh-100">
        <div className="container">
          <BackToAdminDashboard></BackToAdminDashboard>
          <div className="row justify-content-center gutter-y-default mt-5">

            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/3541/3541375.png" width={75} height={75} alt="image alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <h5 className="heading">Update Banner</h5>
                    {banner.map((e) => (
                      <Link
                        to={`/admin/edit-banner-option/${e._id}`}
                        className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                      >
                        <span>Edit</span>
                      </Link>
                    ))}

                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/13731/13731314.png" width={75} height={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <>
                      <h5 className="heading">Feature Options</h5>
                      <Link
                        to="/admin/feature-page/"
                        className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                      >
                        <span>Edit</span>
                      </Link>
                    </>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
            
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/10306/10306666.png" width={75} height={75} alt="images alt" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <>
                      <h5 className="heading">About Options</h5>
                      <Link
                        to="/admin/about-service-list/"
                        className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                      >
                        <span>Edit</span>
                      </Link>
                    </>
                  </h3>
                </div>
              </div>
            </div>
            
            <div
              className="col-lg-3 col-md-6 aos-init aos-animate"
             
            >
              <div className="service-card-2">
                <div className="service-card-2__icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2013/2013695.png" width={75} height={75} alt="profiles" />
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    <h5 className="heading">Update Testimonials</h5>
                    <Link
                      to="/admin/testimonials"
                      className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                    >
                      <span>Edit</span>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomaPageSetting;
