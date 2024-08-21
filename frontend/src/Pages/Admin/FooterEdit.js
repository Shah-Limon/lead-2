import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const FooterEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [footerLink, setFooterLink] = useState([]);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/footer-links/`)
      .then((res) => res.json())
      .then((info) => setFooterLink(info));
  }, [id]);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social/`)
      .then((res) => res.json())
      .then((info) => setSocial(info));
  }, [id]);

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
                  <img src="https://cdn-icons-png.flaticon.com/512/9195/9195144.png" alt="images icon" width={75} height={75} />
                </div>
                <div className="service-card-2__body">

                  <h3 className="service-card-2__title">
                    <h3 className="service-card-2__title">
                      Contact Options
                    </h3>
                    {social.map((e) => (
                      <Link
                        to={`/admin/edit-social/${e._id}`}
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
                  <img src="https://cdn-icons-png.flaticon.com/512/9111/9111543.png" alt="images alt" width={75} height={75}/>
                </div>
                <div className="service-card-2__body">
                  <h3 className="service-card-2__title">
                    Footer About Options
                  </h3>
                  <h3 className="service-card-2__title">
                    {footerLink.map((e) => (
                      <Link
                        to={`/admin/edit-footer/${e._id}`}
                        className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                      >
                        <span>Edit</span>
                      </Link>
                    ))}
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

export default FooterEdit;
