import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import LeadsForUserDashboard from "../components/Shared/LeadsForUserDashboard";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const FindLeads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState); // Toggle the sidebar state correctly
  };
  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* <DashboardSidebar></DashboardSidebar> */}
      <div className="content">
        <h2 className="text-center">Find Leads</h2>
        {profile.filter((pro) => pro.userEmail === user?.email).length ===
          1 && (
          <p>
            <LeadsForUserDashboard></LeadsForUserDashboard>
          </p>
        )}
        {profile.filter((pro) => pro.userEmail === user?.email).length ===
          0 && (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Link to="/update-profile">Please Update your profile first</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindLeads;
