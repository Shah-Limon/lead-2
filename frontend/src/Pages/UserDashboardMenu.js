import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const UserDashboardMenu = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const handleSignout = () => {
    signOut(auth);
  };


  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info));
  }, []);

  // Filter the orders with paymentStatus === "Received"
  const receivedOrders = orders.filter((order) => order.paymentStatus === 'Received' && order.customerEmail === user?.email);

  // Calculate the total spend
  const totalSpend = receivedOrders.reduce((total, order) => total + parseFloat(order.packagePrice), 0);

  return (
    <>
      <section className="project s2">
        <div className="shape right" />
        <div className="container">
        <div className="row mb-15">
              <div
                className="col"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div>
                  {user ? (
                    <Link className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5" onClick={handleSignout}>
                      <span>Signout</span>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/user-dashboard/my-orders/" className="h5 title">
                    My Orders <br></br>(Total Orders: {receivedOrders.length})
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <p className="h5 title">
                    Total Spent ({totalSpend}$)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/user-dashboard/support/" className="h5 title">
                    Support
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

export default UserDashboardMenu;
