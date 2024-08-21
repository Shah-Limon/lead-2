import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { CSVLink } from "react-csv";

const MyAllLeads = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [myLeads, setMyLeads] = useState([]);
    const [user] = useAuthState(auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsPerPage] = useState(25);
    const [selectedLeads, setSelectedLeads] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:5000/my-all-leads/`)
        .then((res) => res.json())
        .then((info) => setMyLeads(info));
    }, []);
  
    const getUserLeadsAsCSV = () => {
      const userLeads = myLeads.filter((lead) => user?.email === lead.leadAdded);
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
      setCurrentPage(1); // Reset to first page when filter changes
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
  
  
    const handleLeadSelect = (leadId) => {
      if (selectedLeads.includes(leadId)) {
        // Remove lead from selectedLeads if already selected
        setSelectedLeads((prevSelected) =>
          prevSelected.filter((id) => id !== leadId)
        );
      } else {
        // Add lead to selectedLeads if not selected
        setSelectedLeads((prevSelected) => [...prevSelected, leadId]);
      }
    };



  const handleUpdateLeads = () => {
    fetch(`http://localhost:5000/update-my-leads`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leads: selectedLeads,
        updatedLeadAddedBy: "newLeadAddedBy", // Change this to the desired value
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error updating leads:", error);
      });
  };

  // ... existing code ...

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* <DashboardSidebar></DashboardSidebar> */}

      <div className="content">
        <h2>My Collected Leads: {myLeads.filter(my => my.leadAdded === user?.email).length}</h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* ... other existing buttons ... */}
          <button onClick={handleUpdateLeads}>Update Selected Leads</button>
        </div>
        {/* ... existing code ... */}
        <tbody>
          {filteredLeads
            .slice(indexOfFirstLead, indexOfLastLead)
            .map((lead, i) => (
              <tr key={lead._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleLeadSelect(lead._id)}
                  />
                </td>
                <td>{i + 1 + indexOfFirstLead}</td>
                <td>{lead.personEmail}</td>
                <td>{lead.personName}</td>
                <td>{lead.title}</td>
                <td>{lead.website}</td>
                <td>{lead.industry}</td>
              </tr>
            ))}
        </tbody>
        {/* ... existing code ... */}
      </div>
    </div>
  );
};

export default MyAllLeads;
