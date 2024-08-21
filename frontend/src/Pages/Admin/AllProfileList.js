import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const AllProfileList = () => {
  const [profile, setProfile] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data based on search queries and pagination
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/profiles?name=${searchName}&email=${searchEmail}`
      );
      const data = await response.json();
      setProfile(data);
    };

    fetchData();
  }, [searchName, searchEmail, currentPage]);

  // Filter the data based on search queries
  const filteredProfile = profile.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchName.toLowerCase()) &&
      item.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProfile.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container hight-full">
        <div className="col-sm mb-15">
          <BackToAdminDashboard></BackToAdminDashboard>
        </div>

        <div class="row justify-content-center align-items-center g-2 mt-5">
          <div class="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div class="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
          </div>
        </div>

        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Credits</th>
              <th>-</th>
            </tr>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td data-th="SL No.">{index + 1}</td>
                <td data-th="Name">{item.userName}</td>
                <td data-th="Email">{item.userEmail}</td>
                <td data-th="Credit">{item.userPoint}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-user-profile/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ul className="pagination mb-5">
          {Array.from({
            length: Math.ceil(filteredProfile.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllProfileList;
