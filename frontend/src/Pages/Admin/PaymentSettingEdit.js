import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSettingEdit = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/payment-account/${id}`)
      .then((res) => res.json())
      .then((info) => setPayment(info));
  }, [id]);

  const handleEditPayment = (event) => {
    event.preventDefault();
    const paymentAccount = event.target.paymentAccount.value;
    const accountType = event.target.accountType.value;
    const guideLine = event.target.guideLine.value;

    const editPayment = { paymentAccount, accountType, guideLine };

    const url = `http://localhost:5000/payment-edit/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editPayment),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/dashboard`);
      });
  };



  return (
    <div className="container mx-auto">
      <form onSubmit={handleEditPayment}>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          defaultValue={payment.paymentAccount}
          name="paymentAccount"
        ></input>{" "}
        <br></br>
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
        <input className="btn" type="submit" value="Update Now"></input>
      </form>
    </div>
  );
};

export default PaymentSettingEdit;
