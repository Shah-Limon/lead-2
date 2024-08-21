import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Updatepaypal = () => {
  const { id } = useParams();
  const [paymentEmail, setPaymentEmail] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/payments`)
      .then((res) => res.json())
      .then((info) => setPaymentEmail(info));
  }, []);

  const handleUpdatePayment = (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    const updateEmail = {
      email,
    };

    const url = `http://localhost:5000/payment/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateEmail),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  return (
    <>
    <BackToAdminDashboard></BackToAdminDashboard>
      {paymentEmail.map((payment, i ) => (
        <>
          <section className="banner s2 vh-100" key={i}>
            <div className="shape" />
            <div className="shape right" />
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="block-text center">
                    <h4 className="heading">
                      Update Your Paypal <br /> Email
                      <span className="arlo_tm_animation_text_word" /> <br />
                    </h4>

                    <form
                      onSubmit={handleUpdatePayment}
                      class="form card-box"
                      style={{ width: "100%" }}
                    >
                      <div class="container">
                        <div class="row justify-content-center align-items-baseline">
                          <div class="col-sm">
                            <div class="form-group mb-3">
                              <input
                                required
                                type="email"
                                class="form-control"
                                placeholder="Paypal Email"
                                name="email"
                                defaultValue={payment.email}
                              />
                            </div>
                          </div>

                          <div class="col-sm">
                            <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                              <span>Update</span>
                            </button>
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

export default Updatepaypal;
