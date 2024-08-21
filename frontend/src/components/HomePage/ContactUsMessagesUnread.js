import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessagesUnread = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  useEffect(() => {
    fetch(`http://localhost:5000/contact-messages`)
      .then((res) => res.json())
      .then((info) => setMessages(info.reverse()));
  }, []);

  // Calculate the index of the last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let rowNumber = 1;

  return (
    <>
      <div className="container">
      <BackToAdminDashboard></BackToAdminDashboard>
        <div className="custom-ordermenu">
          <div className="header__right container custom-orders">
          <ul className="menu d-flex">
          
            <li className="menu-item menu-item-has-children">
              <Link to="/admin/contact-message-read/" class="btn-masco btn-masco--header rounded-pill btn-fill--up">

                <span>Read Contact Messages</span>
              </Link>
            </li>
          </ul>
          </div>
        </div>
        <table className="rwd-table">
        <span>Unread Contact Messages</span>
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
            {currentMessages.map(
              (item, index) =>
                item.messageStatus === "UnRead" && (
                  <tr key={item._id}>
                    <td>{rowNumber++ + indexOfFirstItem}</td>
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
                )
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {Array(Math.ceil(currentMessages.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={index + 1 === currentPage ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ContactUsMessagesUnread;
