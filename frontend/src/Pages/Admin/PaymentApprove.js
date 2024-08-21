import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentApprove = () => {
  const { id } = useParams();
  const [order, setorder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => res.json())
      .then((info) => setorder(info));
  }, [id]);

  const handlePaymentStatus = event => {
    event.preventDefault();
    const paymentStatus = event.target.paymentStatus.value;
    
    const paymentStatusChange = {paymentStatus};

    const url = `http://localhost:5000/payment-status/${order._id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(paymentStatusChange)
    })
        .then(res => res.json())
        .then(result => {
            navigate('/admin/orders');

        })
};


  return (
    <div>
      <form onSubmit={handlePaymentStatus}>
        <select name="paymentStatus">
          <option value="Received">Payment Received</option>
          <option value="Pending">Payment Pending</option>
          
        </select>
        <input type='submit' value='Update'></input>
      </form>
    </div>
  );
};

export default PaymentApprove;
