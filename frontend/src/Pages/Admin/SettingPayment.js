import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const SettingPayment = () => {
  const { id } = useParams();
  const [paymentEmail, setPaymentEmail] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/payments`)
      .then((res) => res.json())
      .then((info) => setPaymentEmail(info));
  }, []);

  return (
    <>
      {paymentEmail.map((payment) => (
        <>
          <section className="banner s2 vh-100">
            <div className="shape" />
            <div className="shape right" />
            <div className="container">
            <BackToAdminDashboard></BackToAdminDashboard>
              <div className="row mt-15">
                <div className="col-12">
                  <div className="block-text center">
                    <h4 className="heading">
                      Your Paypal <br /> Email
                      <span className="arlo_tm_animation_text_word" /> <br />
                    </h4>

                    <form class="form card-box" style={{ width: "100%" }}>
                      <div class="container">
                        <div class="row justify-content-center align-items-baseline">
                          <div class="col-sm">
                            <div class="form-group mb-3">
                              <h5>{payment.email}</h5>
                            </div>
                          </div>

                          <div class="col-sm">
                            <Link
                              to={`/admin/paypal/${payment._id}`}
                              class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                            >
                              <span>Want to Update</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </>
      ))}
    </>
  );
};

export default SettingPayment;
