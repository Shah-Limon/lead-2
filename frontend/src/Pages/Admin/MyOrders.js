import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setorders] = useState([]);
    const [user] = useAuthState(auth);
    const itemsPerPage = 10; // Number of items to display per page

    const [currentPageOrders, setCurrentPageOrders] = useState(1);


  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setorders(info));
  }, []);

  let rowNumberOrders = (currentPageOrders - 1) * itemsPerPage + 1;

  const totalPagesOrders = Math.ceil(
    orders.filter((order) => order.customerEmail === user?.email).length /
      itemsPerPage
  );

  const handlePageChangeOrders = (newPage) => {
    setCurrentPageOrders(newPage);
  };

    return (
        <div>
            {orders.filter((order) => order.customerEmail === user?.email).length >=
        1 && (
        <div className="container">
          <h3 className="text-center">My Orders</h3>

          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Package</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>-</th>
              </tr>

              {orders
                .filter((order) => order.customerEmail === user?.email)
                .slice(
                  (currentPageOrders - 1) * itemsPerPage,
                  currentPageOrders * itemsPerPage
                )
                .map((order) => (
                  <tr key={order._id}>
                    <td>{rowNumberOrders++}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderId}</td>
                    <td>{order.packageName}</td>
                    <td>{order.packagePrice}$</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.orderStatus}</td>
                    <td>
                      {order.paymentStatus === "Pending" && (
                        <Link to={`/pay-now/${order._id}`}>Pay Now</Link>
                      )}
                      {order.paymentStatus === "Received" && (
                        <>Payment is Completed</>
                      )}
                      {order.paymentStatus === "Cancelled" && (
                        <>Payment is Cancelled</>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          

          {/* Pagination for Orders */}
          <div className="pagination">
            <ul>
              {Array.from({ length: totalPagesOrders }, (_, index) => {
                return (
                  <li>
                    {" "}
                    <Link
                      key={index}
                      onClick={() => handlePageChangeOrders(index + 1)}
                      className={
                        currentPageOrders === index + 1 ? "active" : ""
                      }
                    >
                      {index + 1}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
        </div>
    );
};

export default MyOrders;