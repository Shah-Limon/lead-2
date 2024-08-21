import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditAboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about-service/${id}`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, [id]);

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

    const url = `http://localhost:5000/edit-about-service/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  }

  return (
    <div
      className="mb-5"
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleSlider}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Update</span>
            </h4>
            <div class="col-sm">
              <label className="mt-1">Enter Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title"
                  name="title"
                  defaultValue={sliders.title}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Description</label>
              <div class="form-group mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Enter Description"
                  name="description"
                  defaultValue={sliders.description}
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Image URL</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Point One"
                  name="img"
                  defaultValue={sliders.img}
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
                  defaultValue={sliders.pointOne}
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
                  defaultValue={sliders.pointTwo}
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
                  defaultValue={sliders.pointThree}
                />
              </div>
            </div>

            <div class="col-sm">
              <button
                type="submit"
                class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAboutList;
