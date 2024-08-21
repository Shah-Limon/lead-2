import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardSidebar = () => {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/profiles`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  return (
    <>
    
        <div className="sidebar">
          <div className="mb-5 text-center">
            {profile.map(pro => pro.userEmail === user?.email && (
              <div key={pro.userEmail} className="content-testimonial__user-metadata d-flex flex-column align-items-center">
                <div className="content-testimonial__user mb-3">
                  <img src={pro.profileImg} width={75} height={75} alt="alternative text" className="rounded-circle" />
                </div>
                <div className="content-testimonial__body">
                  <span>{pro.userName}</span>
                </div>
                <div className="content-testimonial__body">
                  <span>{pro.userEmail}</span>
                </div>
                <Link
                  className="btn btn-primary rounded-pill text-white mt-2"
                  onClick={handleSignout}
                >
                  <span>Log Out</span>
                </Link>

              </div>
            ))}
          </div>

          <h5 className="font-weight-bold">
            Available Credit{" "}
            <span className="ml-1">
              {profile.map((e) => user?.email === e.userEmail && e.userPoint)}
            </span>
          </h5>

          <nav className="menu-block" id="append-menu-header">
            <ul className="site-menu-main" style={{ flexDirection: 'column' }}>
              <li className="nav-item">

              </li>
              <li className="nav-item">
                <Link to="/find-leads" className="nav-link-item">
                  Find Leads
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-leads" className="nav-link-item">
                  My Leads
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user-dashboard/my-orders/" className="nav-link-item">
                  My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/deposit" className="nav-link-item drop-trigger">
                  Buy Credits
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link-item drop-trigger">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
    
    </>
  );
};

export default DashboardSidebar;
