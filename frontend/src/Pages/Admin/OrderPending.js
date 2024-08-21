import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

import { ScaleLoader  } from "react-spinners";

const OrderPending = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => {
        setOrders(info.reverse());
        setLoading(false); 
      });
  }, []);

  // // Filter orders with orderStatus === "Pending"
  // const pendingOrders = orders.filter(
  //   (order) => order.orderStatus === "Pending"
  // );

  // const paginatedOrders = pendingOrders.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const totalPages = Math.ceil(pendingOrders.length / itemsPerPage);

  // const changePage = (page) => {
  //   setCurrentPage(page);
  // };



  /*  */


  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const OrderFilter = orders.filter(
    (order) => order.orderStatus === "Pending"
  );
 

  const totalOrders = OrderFilter.length;

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  // Calculate the range of pagination digits
  const startDigit = Math.max(
    1,
    currentPage - Math.floor(paginationDigits / 2)
  );
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = OrderFilter.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="hight-full">
        <h4 className="text-center">Total Pending Orders</h4>
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
                <h4 className="text-center">Total Pending Orders</h4>
              
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
              {currentItems.map((item, index) => (
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
        <div className="pagination pagination__margin">
                  <ul>
                    <li className="d-flex">
                      {currentPage > 1 && (
                        <Link onClick={() => paginate(currentPage - 1)}>
                          {"<"}
                        </Link>
                      )}
                      {Array.from(
                        { length: endDigit - startDigit + 1 },
                        (_, index) => (
                          <Link
                            key={startDigit + index}
                            onClick={() => paginate(startDigit + index)}
                          >
                            {startDigit + index}
                          </Link>
                        )
                      )}
                      {currentPage < totalPages && (
                        <Link onClick={() => paginate(currentPage + 1)}>
                          {">"}
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
      </div>
    </>
  );
};

export default OrderPending;