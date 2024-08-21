import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const AboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about-services`)
      .then((res) => res.json())
      .then((info) => setAbouts(info));
  }, []);

  let rowNumber = 1;


  const handleSlider = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const img = event.target.img.value;
    const pointOne = event.target.pointOne.value;
    const pointTwo = event.target.pointTwo.value;
    const pointThree = event.target.pointThree.value;

    const footerSocial = {
      title,
      description,
      img,
      pointOne,
      pointTwo,
      pointThree

    };

    const url = `http://localhost:5000/add-about-service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  }



  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form" onSubmit={handleSlider}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Add</span>
            </h4>
            <div className="col-sm">
              <label className="mt-1">Enter Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Description</label>
              <div className="form-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Image URL</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Image URL"
                  name="img"
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Point One</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point One"
                  name="pointOne"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Point Two</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Two"
                  name="pointTwo"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Point Three</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point Three"
                  name="pointThree"
                />
              </div>
            </div>



            <div className="col-sm">
              <button
                type="submit"
                className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="container">
        <table className="rwd-table">
          <h5 className="sub-heading mb-15">
            <span>List</span>
          </h5>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Title</th>
              <th>Edit</th>
            </tr>
            {abouts.map((item) => (
              <tr key={item._id}>
                <td>{rowNumber++}</td>
                <td>{item.title}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-about-service/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutList;
