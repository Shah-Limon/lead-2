import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => res.json())
      .then((info) => setOrder(info));
  }, [order]);

  const handleOrderEdit = event => {
    event.preventDefault();
    const customerName = event.target.customerName.value;
    const customerAddress = event.target.customerAddress.value;
    const customerUpozilaName = event.target.customerUpozilaName.value;
    const customerDistrictName = event.target.customerDistrictName.value;
    const customerPhoneNumber = event.target.customerPhoneNumber.value;
    
    const orderEdit = {customerName, customerAddress, customerUpozilaName, customerDistrictName, customerPhoneNumber};

    const url = `http://localhost:5000/order-edit/${order._id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(orderEdit)
    })
        .then(res => res.json())
        .then(result => {
            navigate('/admin/orders');

        })
};


  return (
    <div className="container mx-auto items-center">
      <form onSubmit={handleOrderEdit}>
       

        <input
          type="text"
          defaultValue={order.customerName}
          name="customerName"
          placeholder="Your Full Name"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <br></br>
        <input
          type="text"
          defaultValue={order.customerAddress}
          name="customerAddress"
          placeholder="Your Address"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <br></br>
        <input
          type="text"
          defaultValue={order.customerUpozilaName}
          name="customerUpozilaName"
          placeholder="Your Upozila"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <br></br>
        <input
          type="text"
          defaultValue={order.customerDistrictName}
          name="customerDistrictName"
          placeholder="District"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <br></br>
        <input
          type="number"
          defaultValue={order.customerPhoneNumber}
          name="customerPhoneNumber"
          placeholder="Your Phone Number"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <br></br>
        <input
          className="btn w-full max-w-xs"
          type="submit"
          value="Update"
        ></input>
      </form>
    </div>
  );
};

export default EditOrder;
