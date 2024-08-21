import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);
  const [myLeads, setMyLeads] = useState([]);
  const [lists, setLists] = useState([]);
  const handleSignout = () => {
    signOut(auth);
  };
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/lists/`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => {
        const filteredLeads = info.filter(
          (lead) => lead.leadAdded === user?.email
        );
        setMyLeads(filteredLeads);
      });
  }, [user]);

  let rowNumber = 1;

  return (
    <div className={`dashboard section-space ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* <DashboardSidebar></DashboardSidebar> */}
      <div className="content">
        <div class="horizontal-line bg-ColorBlack mb-[10px]"></div>
        <h2 className="text-center">Dashboard</h2>
        {profile.filter((pro) => pro.userEmail === user?.email).length === 1 && (
          <>
            <div className="container">
              <div className="row justify-content-center gutter-y-default">
                <div
                  className="col-lg-3 col-md-6 aos-init aos-animate"

                >
                  <div className="feature-card" style={{
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div className="feature-card__icon">
                      <img
                        src="/image/icons/cash.svg"
                        alt="images alt"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="feature-card__body">
                      <h3 className="feature-card__title"> {profile.map(pro => pro.userEmail === user?.email && <>{pro.userPoint}</>)}</h3>
                      <p>
                        Available Credits
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-3 col-md-6 aos-init aos-animate padding-bottom-100"
                >
                  <div className="feature-card" style={{
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div className="feature-card__icon">
                      <img
                        src="/image/icons/icon-service-6.svg"
                        alt="images alts"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="feature-card__body">

                      <h3 className="feature-card__title">My List: {lists.filter(list => list.listCreatedBy === user?.email).length}</h3>
                      <p>
                        Created Lists
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 aos-init aos-animate"
                >
                  <div className="feature-card" style={{
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div className="feature-card__icon">
                      <img
                        src="/image/icons/h02-feature-2.svg"
                        alt="images alt"
                        width={30}
                        height={30}
                      />
                    </div>
                    <Link to="/my-leads">
                      <div className="feature-card__body">
                        <h3 className="feature-card__title">
                          {myLeads.filter(lead => lead.leadAdded === user?.email).length}
                        </h3>
                        <p>
                          My Collected Leads
                        </p>
                      </div>
                    </Link>


                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 aos-init aos-animate"
                >
                  <div className="feature-card" style={{
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <div className="feature-card__icon">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2F8829889.png?alt=media&token=7ce5142f-5040-4730-a791-28a21e9394bf"
                        alt="images alt"
                        width={30}
                        height={30}
                      />
                    </div>
                    <Link to="/deposit">
                      <div className="feature-card__body">
                        <h3 className="feature-card__title">
                          Buy Credit
                        </h3>
                        <p>
                          Want to buy Credit
                        </p>
                      </div>
                    </Link>


                  </div>
                </div>
              </div>
            </div>

            <div className="card m-5 d-flex justify-content-center align-items-center">
              <section className="gradient-custom p-4 w-100">
                <div className="container">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 rounded text-center">
                      <Link className="btn btn-primary mt-3 mb-4" to='/find-leads'>
                        <h2 className="text-center text-white mb-0">Find Leads</h2>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {profile.filter((pro) => pro.userEmail === user?.email).length ===
          0 && (
            <>
              <div className="card m-5 d-flex justify-content-center align-items-center">
                <section className="gradient-custom p-4 w-100">
                  <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-12 rounded text-center">
                        <Link className="btn btn-primary mt-4 mb-4" to="/update-profile">
                          <h2 className="text-center text-white mb-0">Please Update your profile first</h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

            </>

          )}
      </div>
    </div>
  );
};

export default UserDashboard;
