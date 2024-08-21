import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import auth from "../firebase.init";

const PayNow = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [paypal, setPaypal] = useState([]);

  const currentDomain = window.location.origin;

  useEffect(() => {
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => res.json())
      .then((info) => setOrder(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/payments`)
      .then((res) => res.json())
      .then((info) => setPaypal(info));
  }, []);

  return (
    <section className="banner">
      <div className="container">
        <div className="row vh-100 align-items-center">
          <div className="col-md-8 mx-auto text-center">
            <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: 'rgb(250, 249, 245)' }}>
              <h6 className="text-muted mb-4">Pay Now</h6>
              <h2 className="display-4 mb-4">
                {order.packageName}
                <br />
              </h2>
              <p className="lead mb-4">
                Credit: {order.totalCredits}
              </p>
              <form
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_top"
                className="d-flex flex-column align-items-center"
              >
                {paypal.map((e) => (
                  <input key={e.email} name="business" type="hidden" value={e.email} />
                ))}
                <input type="hidden" name="item_number" value="1" />
                <input type="hidden" name="amount" value={order.packagePrice} />
                <input type="hidden" name="no_shipping" value="1" />
                <input type="hidden" name="currency_code" value="USD" />
                <input
                  type="hidden"
                  name="notify_url"
                  value="http://sitename/paypal-payment-gateway-integration-in-php/notify.php"
                />
                <input
                  type="hidden"
                  name="cancel_return"
                  value={`${currentDomain}/received-payment/${order._id}/${order.paymentId}`}
                  // value={`${currentDomain}/cancelled-payment/${order._id}`}
                />
                <input
                  type="hidden"
                  name="return"
                  value={`${currentDomain}/received-payment/${order._id}/${order.paymentId}`}
                />
                <input type="hidden" name="cmd" value="_xclick" />
                <button
                  type="submit"
                  className="btn btn-primary btn-lg mt-3"
                >
                  ${order.packagePrice} Pay Now With PayPal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayNow;
