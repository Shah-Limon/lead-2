import React from "react";
import { Link } from "react-router-dom";

const HelpDeskMenu = () => {
  return (
   <>
  
    <div className="header__right container custom-orders">
      <nav id="main-nav" className="main-nav">
        <ul id="menu-primary-menu" className="menu custom-orders-ul">
          <li className="menu-item menu-item-has-children">
            <Link to="/admin/help-desk/open-ticket" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
              Open Ticket
            </Link>
          </li>

          <li className="menu-item menu-item-has-children">
            <Link to="/admin/help-desk/replied-ticket" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5 ">
              Replied Ticket
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/admin/help-desk/solved-ticket" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5 ">
              Solved Ticket
            </Link>
          </li>
        </ul>
      </nav>
    </div>
   </>
  );
};

export default HelpDeskMenu;
