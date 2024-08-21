import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import the uuid package
import auth from "../firebase.init";

const Package = () => {
  const [p, setPackage] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [profile, setProfile] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/package/${id}`)
      .then((res) => res.json())
      .then((info) => setPackage(info));
  }, [id]);

  const generateUniquePaymentId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let paymentId = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      paymentId += characters.charAt(randomIndex);
    }
    return paymentId;
  };

  const generateUniqueOrderId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }
    return orderId;
  };

  useEffect(() => {
    fetch(`http://localhost:5000/profiles`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, [id]);

  const handleOrder = (event) => {
    event.preventDefault();
    const paymentId = generateUniquePaymentId();
    const orderId = generateUniqueOrderId();

    const packageId = event.target.packageId.value;
    const packageName = event.target.packageName.value;
    const packagePrice = event.target.packagePrice.value;
    const totalCredits = event.target.totalCredits.value;
    const paymentStatus = event.target.paymentStatus.value;
    const orderStatus = event.target.orderStatus.value;
    const customerEmail = event.target.customerEmail.value;
    const customerName = event.target.customerName.value;
    const address = event.target.address.value;
    const countryName = event.target.countryName.value;
    const cityName = event.target.cityName.value;

    const order = {
      paymentId,
      orderId,
      packageId,
      packageName,
      packagePrice,
      totalCredits,
      paymentStatus,
      orderStatus,
      customerEmail,
      customerName,
      address,
      countryName,
      cityName,
      orderDate: orderDate,
    };

    const url = `http://localhost:5000/new-order`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/pending-payment/");
      });
  };

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    setOrderDate(`${day}/${month}/${year}`);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching country data: ", error);
      });
  }, []);

  return (
    <div
      className="container vh-100"
    >
      <form className="form" onSubmit={handleOrder}>
        <input type="text" value={p._id} name="packageId" hidden />
        <input type="text" value={p.packageName} name="packageName" hidden />
        <input type="text" value={p.price} name="packagePrice" hidden />
        <input type="text" value="Pending" name="paymentStatus" hidden />
        <input type="text" value="Pending" name="orderStatus" hidden />
        <input
          type="number"
          value={p.totalCredits}
          name="totalCredits"
          hidden
        />
        <input
          type="text"
          hidden
          class="form-control"
          value={user?.email}
          name="customerEmail"
        />
        <div class="col-sm">
          <div class="form-group mb-3">
            <input
              hidden
              type="text"
              className="form-control"
              name="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
        </div>
        <div class="col-sm">
          <label className="mt-1">Your Full Name</label>
          <div class="form-group mb-3">
            {profile.map(
              (e) =>
                e.userEmail === user?.email && (
                  <input
                    required
                    type="text"
                    class="form-control"
                    name="customerName"
                    value={e.userName}
                  />
                )
            )}
          </div>
        </div>
        <div class="col-sm">
          <label className="mt-1">Address</label>
          <div class="form-group mb-3">
            <input required type="text" class="form-control" name="address" />
          </div>
        </div>
        <div class="col-sm">
          <label className="mt-1">City</label>
          <div class="form-group mb-3">
            <input required type="text" class="form-control" name="cityName" />
          </div>
        </div>
        <div class="col-sm">
          <label className="mt-1">Country</label>
          <div class="form-group mb-3">
            <select
              required
              className="form-control"
              name="countryName"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div class="col-sm">
          <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
            <span>Place Order and Continue For Make Payment</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Package;
