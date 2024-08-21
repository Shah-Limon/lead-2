import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";

const SupportPage = () => {
  const [user] = useAuthState(auth);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/tickets`)
      .then((res) => res.json())
      .then((info) => setTickets(info.reverse()));
  }, []);
  let rowNumber =1 ;

  return (
    <>
      <section className="faq vh-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row" style={{ float: "right" }}>
                <div className="col">
                  <Link
                    to="/user-dashboard/create-ticket/"
                    type="sumbit"
                    className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                  >
                    <span>Create Ticket</span>
                  </Link>
                </div>
              </div>
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Support</span>
                </h6>

                <h3 className="heading mb-15">
                  We Hope You Find What You
                  <br />
                  are Looking for
                </h3>

              {
                tickets.filter(ticket=> ticket.ticketCreator === user?.email).length >= 1 &&
                <div className="container">
                <h5 mt-15>List of the Submitted Tickets</h5>
                <table className="rwd-table" style={{ marginTop: "2rem" }}>
                  <tbody>
                    <tr>
                      <th>SL No.</th>
                      <th>Date</th>
                      <th>Ticket ID</th>
                      <th>Subject</th>
                      <th>Status</th>

                      <th>View</th>
                    </tr>
                    {tickets.map((item, index) => ( item.ticketCreator === user?.email &&
                      <tr key={item._id}>
                        <td>{rowNumber++}</td>

                        <td>{item.currentDate}</td>
                        <td>{item.TicketId}</td>
                        <td>{item.subject}</td>
                        <td>{item.ticketStatus}</td>

                        <td>
                          <Link to={`/user-dashboard/ticket/${item._id}`}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              }
              {
                tickets.filter(ticket=> ticket.ticketCreator === user?.email).length === 0 &&
               <>
               <div className="col">
                  <Link
                    to="/user-dashboard/create-ticket/"
                    type="sumbit"
                    className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
                  >
                    <span>Create Ticket</span>
                  </Link>
                </div>
               </>
              }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportPage;
