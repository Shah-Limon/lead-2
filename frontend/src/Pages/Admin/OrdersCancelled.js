import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const PaymentPending = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info));
  }, []);

  // Filter orders with paymentStatus === "Cancelled"
  const OrdersCancelled = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  );
 // Pagination function
 const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const totalPages = Math.ceil(OrdersCancelled.length / itemsPerPage);

// Calculate the range of pagination digits
const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

// Calculate the index range for the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = OrdersCancelled.slice(indexOfFirstItem, indexOfLastItem);
  

  return (
    <>
      <div className="hight-full">
        <h4 className="text-center">Total Orders Cancelled</h4>
        <OrderMenu></OrderMenu>
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
                <td data-th="SL No.">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td data-th="Date">{item.orderDate}</td>
                <td data-th="Name">{item.customerName}</td>
                <td data-th="Package">{item.packageName}</td>
                <td data-th="Price">${item.packagePrice}</td>
                <td data-th="Website">{item.customerWebsite}</td>
                <td data-th="Email">{item.customerEmail}</td>
                <td data-th="Note">{item.customerNote}</td>
                
                <td data-th="Order Status">{item.orderStatus}</td>
                <td data-th="Edit">
                  <Link to={`/admin/order/${item._id}`}>Action</Link>
                </td>
              </tr>
            ))}
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
    </>
  );
};

export default PaymentPending;
