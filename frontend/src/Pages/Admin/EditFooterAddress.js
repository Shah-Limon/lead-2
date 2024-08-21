import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditFooterAddress = () => {
    const [footerAddress, setFooterAddress] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/footer-address/${id}`)
      .then((res) => res.json())
      .then((info) => setFooterAddress(info));
  }, [id]);

  const handleFooterAddress = (event) => {
    event.preventDefault();
    const footerPhone = event.target.footerPhone.value;
    const footerEmail = event.target.footerEmail.value;
    const footerAdress = event.target.footerAdress.value;

    const footerAddress = {
      footerPhone,
      footerEmail,
      footerAdress,
    };

    const url = `http://localhost:5000/footer-address/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerAddress),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };

  return (
    <div>
      <h2>Address Setting</h2>
      
      <form onSubmit={handleFooterAddress}>
            <input
              type="text"
              name="footerPhone"
              defaultValue={footerAddress.footerPhone}
            ></input>
            <br></br>
            <input
              type="text"
              name="footerEmail"
              defaultValue={footerAddress.footerEmail}
            ></input>
            <br></br>
            <input
              type="text"
              name="footerAdress"
              defaultValue={footerAddress.footerAdress}
            ></input>
            <br></br>

            <input type="submit" value="Update"></input>
          </form>
    </div>
  );
};



export default EditFooterAddress;