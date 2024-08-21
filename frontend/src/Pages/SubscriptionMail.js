import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToAdminDashboard from "./Admin/BackToAdminDashboard";

const SubscriptionMail = () => {
  const [mail, setMail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/subscription-email`)
      .then((res) => res.json())
      .then((info) => setMail(info));
  }, []);

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(mail.length / itemsPerPage);

  // Calculate the range of pagination digits
  const startDigit = Math.max(
    1,
    currentPage - Math.floor(paginationDigits / 2)
  );
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mail.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div
        className="container vh-100"
      >
        <BackToAdminDashboard></BackToAdminDashboard>
        <h5 className="mb-15">Subscription Email</h5>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Email</th>
              <th>-</th>
            </tr>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td data-th="Email">{item.email}</td>
                <td>-</td>
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

export default SubscriptionMail;
