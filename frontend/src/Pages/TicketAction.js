import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TicketAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});

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

  return (
    <>
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
                <form className="form-box box__color">
                  <div className="message-container">
                    {tickets.map((t, index) => {
                      if (ticket._id === t.ticketID) {
                        return (
                          <div key={t._id} className="message">
                            {index % 2 === 0 ? (
                              <>
                                <label>User's Reply</label>
                                <p>{t.creatorMessage}</p>
                              </>
                            ) : (
                              <>
                                <label>Admin's Reply</label>
                                <p>{t.adminMessage}</p>
                              </>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Reply</label>
                      <p required name="creatorReply" cols={30} rows={10} />
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col">
                      <button type="submit" className="btn circle btn-theme-effect btn-sm">
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

export default TicketAction;
