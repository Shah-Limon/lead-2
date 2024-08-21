import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import HelpDeskMenu from "./HelpDeskMenu";
import BackToAdminDashboard from "./Admin/BackToAdminDashboard";

const SolvedTicket = () => {
  const [user] = useAuthState(auth);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/tickets`)
      .then((res) => res.json())
      .then((info) => setTickets(info.reverse()));
  }, []);

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const OpenTicket = tickets.filter((ticket) => ticket.ticketStatus === "Open");

  const totalOpenTicket = OpenTicket.length;

  const totalPages = Math.ceil(totalOpenTicket / itemsPerPage);

  // Calculate the range of pagination digits
  const startDigit = Math.max(
    1,
    currentPage - Math.floor(paginationDigits / 2)
  );
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = OpenTicket.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section className="faq">
        <div className="container">
          <BackToAdminDashboard></BackToAdminDashboard>
          <div className="row mt-15">
            <div className="col-12">
              <div className="row mb-0"></div>

              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Help Desk</span>
                </h6>
                <h3 className="heading">Customer Support Hub</h3>

                <div className="container">
                  <h5 mt-15>List of the Open Tickets</h5>
                  <HelpDeskMenu></HelpDeskMenu> <br></br>
                  <table className="rwd-table" style={{ marginTop: "2rem" }}>
                    <tbody>
                      <tr>
                        <th>SL No.</th>
                        <th>Date</th>
                        <th>Ticket ID</th>
                        <th>Subject</th>
                        <th>Sender</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                      {currentItems.map((item, index) => (
                        <tr key={item._id}>
                          <td data-th="SL No.">
                            {" "}
                            {index + 1 + itemsPerPage * (currentPage - 1)}
                          </td>
                          <td data-th="Date">{item.currentDate}</td>
                          <td data-th="Ticket ID">{item.TicketId}</td>
                          <td data-th="Subject">{item.subject}</td>
                          <td data-th="Sender">{item.ticketCreator}</td>
                          <td data-th="Status">{item.ticketStatus}</td>
                          <td data-th="name">
                            <Link to={`/admin/help-desk/${item._id}`}>
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SolvedTicket;
