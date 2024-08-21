import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./Admin/BackToAdminDashboard";

const HelpDeskAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5000/ticket/${id}`)
      .then((res) => res.json())
      .then((info) => setTicket(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/reply-tickets`)
      .then((res) => res.json())
      .then((info) => setTickets(info));
  }, []);

  // State variable to store the current date
  
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    fetch(`http://worldtimeapi.org/api/timezone/Etc/GMT+5`)
      .then((res) => res.json())
      .then((info) => {
        const apiDateTime = new Date(info.utc_datetime);
        const formattedTime = apiDateTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZoneName: 'short' // Display the timezone abbreviation
        });
        const formattedDate = apiDateTime.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        setCurrentDateTime(`${formattedTime} - ${formattedDate}`);
      });
  }, []);

  const currentDate = currentDateTime

  const HandleTicketReply = (event) => {
    event.preventDefault();
    const ticketCreator = event.target.ticketCreator.value;
    const whoReplied = event.target.whoReplied.value;
    const ticketID = event.target.ticketID.value;
    const creatorMessage = event.target.creatorMessage.value;
    const subject = event.target.subject.value;
    const adminMessage = event.target.adminMessage.value;

    const contact = {
      ticketCreator,
      whoReplied,
      ticketID,
      creatorMessage,
      subject,
      adminMessage,
      currentDate,
    };

    const url = `http://localhost:5000/add-ticket-reply`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/help-desk/");
      });
  };

  const HandleTicketStatus = (event) => {
    event.preventDefault();
    const ticketStatus = event.target.ticketStatus.value;

    const ticket = {
      ticketStatus,
    };

    const url = `http://localhost:5000/ticket/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/help-desk/");
      });
  };

  return (
    <>
      <BackToAdminDashboard></BackToAdminDashboard>
      <section className="touch">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Support</span>
                </h6>
                <h3 className="heading">Help Center</h3>
              </div>
              <div className="touch__main">
                <form onSubmit={HandleTicketStatus} className="form-box__left">
                  <div className="row">
                    <div className="col mb-15 ">
                      <div>
                        <label className="mb-15">Status: </label>
                        <br></br>
                        <select name="ticketStatus">
                          <option value="Solved">Solved</option>
                          <option value="Replied">Replied</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col">
                      <button type="sumbit" className="btn circle btn-theme-effect btn-sm">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </form>

                <form
                  className="form-box box__color"
                  onSubmit={HandleTicketReply}
                >
                  <input
                    hidden
                    type="text"
                    name="ticketCreator"
                    defaultValue={ticket.ticketCreator}
                  />
                  <input hidden type="text" name="whoReplied" value="Admin" />

                  <input
                   hidden
                    type="text"
                    value={currentDate}
                    name="currentDate"
                    readOnly
                  />
                  <input
                    hidden
                    type="text"
                    name="ticketID"
                    defaultValue={ticket._id}
                  />
                  <input
                    hidden
                    type="text"
                    name="creatorMessage"
                    defaultValue={ticket.message}
                  />

                  <div className="row">
                    <div className="col">
                      <label>Subject</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        name="subject"
                        defaultValue={ticket.subject}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>
                        {ticket.names} Message ({ticket.currentDate})
                      </label>
                      <p>{ticket.message}</p>
                      {tickets.map((t) => (
                        <div className="mt-15">
                          {ticket._id === t.ticketID && (
                            <div className="mt-15">
                              {t.whoReplied === "Admin" ? (
                                <div>
                                  <label>
                                    Admin's Message ({t.currentDate})
                                  </label>
                                  <p>{t.adminMessage}</p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          )}

                          {ticket._id === t.ticketID && (
                            <div className="mt-15">
                              {t.whoReplied === "user" ? (
                                <div>
                                  <label>
                                    {ticket.names} Message ({t.currentDate})
                                  </label>
                                  <p>{t.creatorMessageReply}</p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Reply</label>
                      <textarea
                        required
                        name="adminMessage"
                        cols={30}
                        rows={10}
                      />
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col">
                      <button type="sumbit" className="btn circle btn-theme-effect btn-sm">
                        <span>Reply Now</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpDeskAction;
