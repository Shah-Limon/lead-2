import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const PendingPayment = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  let rowNumber = 1;
  return (
    <div className="container hight-full">
      <table className="rwd-table">
        <tbody>
          <tr>
            <th>SL No.</th>
            <th>Order ID</th>
            <th>Package Name</th>
            <th>Amount</th>
            <th>Pay Now</th>
          </tr>

          {orders.map((order) => {
            if (
              order.customerEmail === user?.email &&
              order.paymentStatus === "Pending"
            ) {
              return (
                <tr key={order._id}>
                  <td>{rowNumber++}</td>
                  <td>{order.orderId}</td>
                  <td>{order.packageName}</td>
                  <td>{order.packagePrice}$</td>
                  <td>
                    <Link to={`/pay-now/${order._id}`}>
                      Pay Now With PayPal
                    </Link>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PendingPayment;
