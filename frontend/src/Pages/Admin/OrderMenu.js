import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const OrderMenu = () => {
  const [selectedOption, setSelectedOption] = useState("/admin/orders/");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    window.location.href = selectedValue; // Redirect to the selected option
  };

  return (
    <div className="custom-ordermenu mb-15">
      <BackToAdminDashboard />
      <div className="header__right container">
        <nav id="main-nav" className="main-nav">
          <ul id="menu-primary-menu" className="d-flex">
            <li className="menu-item menu-item-has-children">
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="form-control bg-light-2 gap-3"
              >
                <option value="/admin/orders/">Total Orders</option>
                <option value="/admin/orders-pending">Pending Orders</option>
                <option value="/admin/orders/accepted">Accepted Orders</option>
                <option value="/admin/orders/cancelled">Cancelled Orders</option>
                <option value="/admin/orders/delivered">Delivered Orders</option>
              </select>
            </li>
            <li className="menu-item menu-item-has-children">
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                 className="form-control bg-light-2"
              >
                <option value="/admin/payments/pending">Pending Payments</option>
                <option value="/admin/payments/received">Received Payments</option>
                <option value="/admin/payments/cancelled">Cancelled Payments</option>
                <option value="/admin/payments/refunded">Refunded Payments</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrderMenu;
