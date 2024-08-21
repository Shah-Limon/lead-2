import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";

const LeadsForUserDashboard = () => {
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(3);

  useEffect(() => {
    // Filter function for search
    const filteredData = leads.filter((item) => {
      return (
        item.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        item.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    });
    setFilteredLeads(filteredData);
  }, [searchLocation, searchTitle, leads]);

  useEffect(() => {
    fetch(`http://localhost:5000/all-leads/`)
      .then((res) => res.json())
      .then((info) => setLeads(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => setMyLeads(info));
  }, []);

  const handleLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Location"
              className="form-control"
              name="position"
              value={searchLocation}
              onChange={handleLocationChange}
            />
          </div>
          <div className="vr"></div>
          <div className="col-md-5">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="location"
              value={searchTitle}
              onChange={handleTitleChange}
            />
          </div>
        </div>
      </form>

      {(searchLocation || searchTitle) && (
        <div className="mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Title</th>
                <th>Website</th>
                <th>View</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.map((lead) => (
                <tr key={lead._id} className="lead">
                <td>
                  <p>{lead.personEmail}</p>
                </td>
                <td>
                  <p>{lead.personName}</p>
                </td>
                <td>
                  <p>{lead.title}</p>
                </td>
                <td>
                  <p>{lead.website}</p>
                </td>
                <td>
                  <Link className="btn_lead btn_color_sub" to="/">View</Link>
                </td>
                <td>
                  {myLeads.filter(
                    (mylead) =>
                      mylead.leadAdded === user?.email &&
                      lead.personEmail === mylead.personEmail
                  ).length === 0 && (
                    <form onSubmit={handleAddMyLead}>
                      <input
                        hidden
                        type="email"
                        name="personEmail"
                        value={lead.personEmail}
                      ></input>
                      <input
                        hidden
                        type="text"
                        name="personName"
                        value={lead.personName}
                      ></input>
                      <input
                        hidden
                        type="text"
                        name="title"
                        value={lead.title}
                      ></input>
                      <input
                        hidden
                        type="text"
                        name="website"
                        value={lead.website}
                      ></input>
                      <input
                        hidden
                        type="text"
                        name="location"
                        value={lead.location}
                      ></input>
                      <input
                        hidden
                        type="text"
                        name="leadAdded"
                        value={user?.email}
                      ></input>
                      <input
                        className="btn_lead btn_color_sub"
                        type="submit"
                        value="Add"
                      ></input>
                    </form>
                  )}
                  {myLeads.filter(
                    (mylead) =>
                      mylead.leadAdded === user?.email &&
                      lead.personEmail === mylead.personEmail
                  ).length === 1 && (
                    <input
                      className="btn_lead btn_color_main"
                      type="submit"
                      value="Added"
                    ></input>
                  )}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length > leadsPerPage && (
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {[...Array(Math.ceil(filteredLeads.length / leadsPerPage))].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePaginationClick(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )).slice(currentPage > 1 ? currentPage - 2 : 0, currentPage + 1)}
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadsForUserDashboard;
