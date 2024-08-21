import React, { useEffect, useState } from "react"; // Import useState
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";

const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [currentDateTime, setCurrentDateTime] = useState("");



  // State variable to store the current date
  // const currentDate = new Date().toISOString().split('T')[0];
  // const currentDate = new Date().toLocaleDateString('en-GB'); // 'en-GB' represents the 'dd-mm-yyyy' format
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

  const generateUniqueTicketId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let TicketId = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      TicketId += characters.charAt(randomIndex);
    }
    return TicketId;
  };

  const UserContactMessage = (event) => {
    event.preventDefault();
    const ticketStatus = event.target.ticketStatus.value;
    const ticketCreator = event.target.ticketCreator.value;
    const message = event.target.message.value;
    const subject = event.target.subject.value;
    const names = event.target.names.value;
    const TicketId = generateUniqueTicketId();

    const ticket = {
      TicketId,
      ticketStatus,
      ticketCreator,
      message,
      subject,
      currentDate, // Include the current date
      names
    };

    const url = `http://localhost:5000/add-ticket`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/user-dashboard/support/");
      });
  };

  return (
    <>
      <section className="touch" >
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
                <form onSubmit={UserContactMessage} className="form-box">
                  <input type="text" value="Open" name="ticketStatus" hidden />
                  <input
                    type="text"
                    value={user?.email}
                    name="ticketCreator"
                    hidden
                  />

                  <div className="row">
                    <div className="col">
                      <label>Name</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        name="names"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Subject</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        name="subject"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Message</label>
                      <textarea required name="message" cols={30} rows={10} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                     
                      <input
                      hidden
                        type="text"
                        value={currentDate}
                        name="currentDate"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mb-0">
                    <div className="col">
                      <button type="submit" className="btn circle btn-theme-effect btn-sm"> {/* Fix typo "sumbit" to "submit" */}
                        <span>Send Now</span>
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

export default TicketPage;
