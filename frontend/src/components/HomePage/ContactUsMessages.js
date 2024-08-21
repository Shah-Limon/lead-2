import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessages = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/contact-messages`)
      .then((res) => res.json())
      .then((info) => setMessage(info.reverse()));
  }, []);

  return (
    <>
      <div className="container">
        <BackToAdminDashboard></BackToAdminDashboard>
        <div className="custom-ordermenu">
          <div className="header__right container custom-orders">
            <ul className="menu d-flex mt-5">
              <li className="menu-item menu-item-has-children">
                <Link to="/admin/contact-message-unread/" class="btn-masco btn-masco--header rounded-pill btn-fill--up">
                  <span>Unread Contact Messages</span>
                </Link>
              </li>
              <li className="menu-item menu-item-has-children">
                <Link to="/admin/contact-message-read/" class="btn-masco btn-masco--header rounded-pill btn-fill--up">

                  <span>Read Contact Messages</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <table className="rwd-table">
        <span>All Contact Messages</span>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
            {message.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.messageStatus}</td>
                <td>
                  <Link
                    to={`/admin/contact-message/${item._id}`}
                    className="title"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactUsMessages;
