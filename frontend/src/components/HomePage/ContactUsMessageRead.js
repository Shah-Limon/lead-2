import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessageRead = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/contact-message/${id}`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);

  const UserContactMessage = (event) => {
    event.preventDefault();
    const messageStatus = event.target.messageStatus.value;

    const contact = {
      messageStatus,
    };

    const url = `http://localhost:5000/contact-message/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/contact-messages/");
      });
  };

  return (
    <>
      <section className="vh-100">
        <div className="mb-15">
          <BackToAdminDashboard></BackToAdminDashboard>
        </div>
        <div className="project-details-area default-padding">
          <div className="container">
            <div className="project-details-items">
              <div className="top-info">
                <div className="row">
                  <div className="col-lg-4 right-info">
                    <div className="project-info">
                      <h3 className="title">User Info</h3>
                      <ul>
                        <li>
                          Name: <span> {contact.name}</span>
                        </li>
                        <li>
                          Email: <span>{contact.email}</span>
                        </li>
                        <li>
                          Date:
                          <span>{contact.date}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-8 left-info">
                    <h2>Contact Message</h2>
                    <p className="mt-5">
                      User Message: <br></br>
                      {contact.message}
                    </p>
                    <form onSubmit={UserContactMessage} className="form-box">
                      <input
                        hidden
                        type="text"
                        className="form-control"
                        name="messageStatus"
                        value="Read"
                      />

                      <div className="row">
                        <div className="row mb-0">
                          <div
                            className="col"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn circle btn-theme-effect btn-sm"
                            >
                              <span>
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/11840/11840157.png"
                                  alt="message"
                                  border="0"
                                  width={30}
                                />{" "}
                                Mark as Read
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsMessageRead;
