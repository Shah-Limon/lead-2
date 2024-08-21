import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import PageHero from "./PageHero";

const NavBar = () => {
  const [logo, setLogo] = useState({});
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState([]);
  const location = useLocation();
  const [profile, setProfile] = useState([]);

  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setAdmin(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  const isAdmin = user && admin.some((adm) => adm.userEmail === user.email);

  const isHomePage = location.pathname === "/";
  const shouldRenderPageHero = !isHomePage;

  return (
    <>


      <header className="site-header site-header--transparent  bg--primary">
        <div className="container">
          <nav className="navbar site-navbar">

            <div className="brand-logo">
              <Link to="/">

                <img className="logo-light" src={logo.logo} alt="brand logo" />
                {/* Dark version logo (logo must be White)*/}
                <img
                  className="logo-dark"
                  src={logo.logo}
                  alt="brand logo"
                />
              </Link>
            </div>
            <div className="menu-block-wrapper">
              <div className="menu-overlay" />
              <nav className="menu-block" id="append-menu-header">
                <div className="mobile-menu-head">
                  <Link to="/">
                    <img src={logo.logo} alt="brand logo" />
                  </Link>
                  <div className="current-menu-title" />
                  <div className="mobile-menu-close">×</div>
                </div>
                <ul className="site-menu-main">

                  <li className="nav-item">
                    <Link to="/" className="nav-link-item drop-trigger">
                      Home
                    </Link>
                    <Link to="/pricing" className="nav-link-item drop-trigger">
                      Pricing
                    </Link>
                    <Link to="/about-us" className="nav-link-item drop-trigger">
                      About us
                    </Link>
                    <Link to="/contact" className="nav-link-item drop-trigger">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {user ? (
              <>
                <Link
                  to="/user-dashboard"
                  className="btn-masco btn-masco--header rounded-pill btn-fill--up"
                >
                  <span>Dashboard</span>
                </Link>


                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="btn-masco btn-masco--header rounded-pill btn-fill--up"
                  >
                    <span>Admin</span>
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="btn-masco btn-masco--header rounded-pill btn-fill--up"
              >
                <span>Login</span>
              </Link>
            )}


            {/* {profile.map(pro => pro.userEmail === user?.email && (
              <Link className="nav-item dropdown mt-3 me-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={pro.profileImg || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                    alt="Profile"
                    className="rounded-circle ms-3" // Added margin-left class
                    width="40"
                    height="40"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-0 m-0">
                  <li>
                    <Link className="dropdown-item" to="/user-dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {pro.userName}
                  </li>
                  <li>
                    {pro.userEmail}
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </Link>
            ))} */}

            {profile.map(pro => pro.userEmail === user?.email && (
              <div className="nav-item dropdown mt-3 me-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={pro.profileImg || "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <Link className="dropdown-item" to="/user-dashboard">
                      <i class="fa-solid fa-bars text-primary"></i>{" "}
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/pending-payment/">
                      <i class="fa-solid fa-bars text-primary"></i>{" "}
                      Pending Payment
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <i class="fa-solid fa-user text-primary"></i>{" "}{pro.userName}
                  </li>
                  <li>

                    {pro.userEmail}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignout}>
                      <i class="fa-solid fa-right-from-bracket text-primary"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ))}







            <div className="mobile-menu-trigger">
              <span />
            </div>


          </nav>
        </div>
      </header>

      {shouldRenderPageHero && <PageHero />}
    </>
  );
};

export default NavBar;
