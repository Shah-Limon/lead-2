import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

import { ScaleLoader  } from "react-spinners";

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => {
        setOrders(info.reverse());
        setLoading(false); 
      });
  }, []);

  // Filter orders with orderStatus === "Pending"
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  );

  const paginatedOrders = pendingOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(pendingOrders.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="hight-full">
        <h4 className="text-center">Total Delivered Orders</h4>
        <OrderMenu></OrderMenu>
        {loading ? (
          // Render a loader when data is being fetched
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ScaleLoader color="#36d7b7" margin={50} size={30} />
            ) : (
              // Render your content here when loading is done
              <div>
                <h4 className="text-center">Total Delivered Orders</h4>
              
              </div>
            )}
          </div>
        ) : (
          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Date</th>
                <th>Name</th>
                <th>Package</th>
                <th>Price</th>
                <th>Website</th>
                <th>Email</th>
                <th>Note</th>
                <th>Order Status</th>
                <th>Edit</th>
              </tr>
              {paginatedOrders.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.customerName}</td>
                  <td>{item.packageName}</td>
                  <td>${item.packagePrice}</td>
                  <td>{item.customerWebsite}</td>
                  <td>{item.customerEmail}</td>
                  <td>{item.customerNote}</td>
                  <td>{item.orderStatus}</td>
                  <td>
                    <Link to={`/admin/order/${item._id}`}>Action</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && (
          <div className="pagination mb-15">
            <ul>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <Link
                    onClick={() => changePage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveredOrders;