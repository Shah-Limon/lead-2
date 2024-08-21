import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { CSVLink } from "react-csv";
import { Link, useParams } from "react-router-dom";

const MyLeadsinMyList = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(25);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => {
        const filteredLeads = info.filter(
          (lead) =>
            user?.email === lead.leadAdded &&
            lead.leadAddedToList === list.listName
        );
        setMyLeads(filteredLeads);
      });
  }, [user, list.listName]);

  useEffect(() => {
    fetch(`http://localhost:5000/list/${id}`)
      .then((res) => res.json())
      .then((info) => setList(info));
  }, [id]);

  const getUserLeadsAsCSV = () => {
    const userLeads = myLeads.filter(
      (lead) =>
        user?.email === lead.leadAdded && lead.leadAddedToList === list.listName
    );
    const csvData = [
      ["Email", "Name", "Title", "Website"],
      ...userLeads.map((lead) => [
        lead.personEmail,
        lead.personName,
        lead.title,
        lead.website,
      ]),
    ];
    return csvData;
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = myLeads
    .filter((lead) => user?.email === lead.leadAdded)
    .slice(indexOfFirstLead, indexOfLastLead);

  const totalLeads = myLeads.filter(
    (lead) => user?.email === lead.leadAdded
  ).length;

  const totalPages = Math.ceil(totalLeads / leadsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      const maxPages = 3;
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (currentPage === 1) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage === totalPages) {
        startPage = totalPages - (maxPages - 1);
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchName, SetSearchName] = useState("");
  const [searchWebsite, SetSearchWebsite] = useState("");

  const handleTitleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleLocationSearch = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleIndustrySearch = (event) => {
    setSearchIndustry(event.target.value);
  };

  const handleNameSearch = (event) => {
    SetSearchName(event.target.value);
  };
  const handleWebsiteSearch = (event) => {
    SetSearchWebsite(event.target.value);
  };

  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    const filteredLeads = myLeads.filter((lead) => {
      return (
        user?.email === lead.leadAdded &&
        lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        lead.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
        lead.personName.toLowerCase().includes(searchName.toLowerCase()) &&
        lead.website.toLowerCase().includes(searchWebsite.toLowerCase())
      );
    });
    setCurrentPage(1);
    setFilteredLeads(filteredLeads);
  }, [
    searchTitle,
    searchLocation,
    searchIndustry,
    myLeads,
    searchName,
    user,
    searchWebsite,
  ]);

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* <DashboardSidebar></DashboardSidebar> */}

      <div className="content">
        <h2>
          My Collected Leads:{" "}
          {myLeads.filter((my) => my.leadAdded === user?.email).length}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        <CSVLink
          data={getUserLeadsAsCSV()}
          filename={"user_leads.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>

        <div className="row mt-3">
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Title"
              className="form-control"
              value={searchTitle}
              onChange={handleTitleSearch}
            />
          </div>

          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Location"
              value={searchLocation}
              className="form-control"
              onChange={handleLocationSearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Industry"
              value={searchIndustry}
              className="form-control"
              onChange={handleIndustrySearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              className="form-control"
              onChange={handleNameSearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Website"
              value={searchWebsite}
              className="form-control"
              onChange={handleWebsiteSearch}
            />
          </div>
        </div>

        <div className="mt-5">
          <Link to="/create-list" className="btn btn-primary mb-4 ml-5">
            Create List
          </Link>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Email</th>
                <th>Name</th>
                <th>Title</th>
                <th>Website</th>
                <th>industry</th>

                <th>Add To List</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.slice(indexOfFirstLead, indexOfLastLead).map(
                (lead, i) =>
                  lead.leadAddedToList === list.listName && (
                    <tr key={lead._id}>
                      <td>{i + 1 + indexOfFirstLead}</td>
                      <td>{lead.personEmail}</td>
                      <td>{lead.personName}</td>
                      <td>{lead.title}</td>
                      <td>{lead.website}</td>
                      <td>{lead.industry}</td>

                      <td>
                        <Link className="btn" to={`/add-lead/${lead._id}`}>
                          Move to another list
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination">{getPageNumbers()}</ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLeadsinMyList;
