import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";
import UserDashboardMenu from "./UserDashboardMenu";

const TotalSpend = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;


  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Calculate the range of pagination digits
  const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  let rowNumber = 1;
  return (
    <>
      <UserDashboardMenu></UserDashboardMenu>
      {orders.filter((spent) => spent.customerEmail === user?.email).length >=
        1 && (
        <div className="container">
          <h3 className="text-center">My Spent</h3>
          <table className="rwd-table">
            <tbody>
              <tr>
                <th>SL No.</th>
                <th>Package Name</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Website</th>
              </tr>

              {currentItems.map((list) => {
                if (
                  list.customerEmail === user?.email &&
                  list.paymentStatus === "Received"
                ) {
                  return (
                    <tr key={list._id}>
                      <td>{rowNumber++}</td>
                      <td data-th="Package Name">{list.packageName}</td>

                      <td data-th="Price">{list.packagePrice}$</td>
                      <td data-th="Payment Status">{list.paymentStatus}</td>
                      <td data-th="Order Status">{list.orderStatus}</td>
                      <td data-th="Website">{list.customerWebsite}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
          <div className="pagination pagination__margin">
                 <ul>
                  <li className="d-flex">
                  {currentPage > 1 && (
                    <Link onClick={() => paginate(currentPage - 1)}>{"<"}</Link>
                  )}
                  {Array.from({ length: endDigit - startDigit + 1 }, (_, index) => (
                    <Link
                      key={startDigit + index}
                      onClick={() => paginate(startDigit + index)}
                    >
                      {startDigit + index}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link onClick={() => paginate(currentPage + 1)}>{">"}</Link>
                  )}
                  </li>
                 </ul>
                </div>
        </div>
      )}

      {orders.filter((spent) => spent.customerEmail === user?.email).length ===
        0 && (
        <>
          <h4 className="text-center">You have not spent yet</h4>
          <br></br>
        </>
      )}
    </>
  );
};

export default TotalSpend;
