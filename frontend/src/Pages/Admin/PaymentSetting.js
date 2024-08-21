import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentSetting = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [cash, setCash] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/payment-accounts`)
      .then((res) => res.json())
      .then((info) => setPayments(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/cash-on-delivery`)
      .then((res) => res.json())
      .then((info) => setCash(info));
  }, []);

  const handleCashOnDeliveryEnable = (event) => {
    event.preventDefault();
    const cashOnDeliveryStatus = event.target.cashOnDeliveryStatus.value;

    const cashOnDeliveryInfo = { cashOnDeliveryStatus };

    const url = `http://localhost:5000/cash-on-delivery`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cashOnDeliveryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard");
      });
  };

  const handleAddNewPaymentAccount = (event) => {
    event.preventDefault();
    const paymentOptionName = event.target.paymentOptionName.value;
    const paymentProviderLogo = event.target.paymentProviderLogo.value;
    const paymentAccount = event.target.paymentAccount.value;
    const accountType = event.target.accountType.value;

    const paymentAccountInfo = {
      paymentOptionName,
      paymentProviderLogo,
      paymentAccount,
      accountType,
    };

    const url = `http://localhost:5000/add-payment-account`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(paymentAccountInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard");
      });
  };

  return (
    <div className="container mx-auto justify-center">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Logo</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="w-[100px] h-[50px]"
                    src={payment.paymentProviderLogo}
                    alt="Logo"
                  ></img>
                </td>
                <td>{payment.paymentAccount}</td>
                <td>{payment.accountType}</td>
                <td>
                  <Link to={`/admin/payment-edit/${payment._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Cash On Delivery Option</h2>
      {cash.filter((c) => c.cashOnDeliveryStatus).length === 0 && (
        <div>
          <h2>You have not enabled cash on delivery option</h2>
          <form onSubmit={handleCashOnDeliveryEnable}>
            <input
              hidden
              type="text"
              value="Enabled"
              name="cashOnDeliveryStatus"
            ></input>
            <input type="submit" value="Enable Now"></input>
          </form>
        </div>
      )}
      {cash.filter((c) => c.cashOnDeliveryStatus === "Disabled").length ===
        1 && (
        <>
          {cash.map((c) => (
            <div>
              <h2>Your Cashon Delivery Option is {c.cashOnDeliveryStatus}</h2>
              <Link
                className="btn"
                to={`/admin/enable-cash-on-delivery/${c._id}`}
              >
                Enable Now
              </Link>
            </div>
          ))}
        </>
      )}

      {cash.filter((c) => c.cashOnDeliveryStatus === "Enabled").length ===
        1 && (
        <>
          {cash.map((c) => (
            <div>
              <h2>Your Cashon Delivery Option is {c.cashOnDeliveryStatus}</h2>
              <Link
                className="btn"
                to={`/admin/disable-cash-on-delivery/${c._id}`}
              >
                Disable Now
              </Link>
            </div>
          ))}
        </>
      )}

      <form onSubmit={handleAddNewPaymentAccount}>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="bKash or Rocket"
          name="paymentOptionName"
        ></input>{" "}
        <br></br>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="bKash/Rocket Logo URL"
          name="paymentProviderLogo"
        ></input>{" "}
        <br></br>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="01711223344"
          name="paymentAccount"
        ></input>{" "}
        <br></br>
        <label for="accountType">Select Your Account Type</label> <br></br>
        <select name="accountType">
          <option value="Personal">Personal</option>
          <option value="Agent">Agent</option>
          <option value="Marchent">Marchent</option>
        </select>
        <br></br>
        <textarea
          className="textarea textarea-accent"
          type="text"
          name="guideLine"
        ></textarea>{" "}
        <br></br>
        <input className="btn" type="submit" value="Add Now"></input>
      </form>
    </div>
  );
};

export default PaymentSetting;
