import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";
const TestimonialTitle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonial-title/${id}`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  const handleTitle = (event) => {
    event.preventDefault();
    const titleOne = event.target.titleOne.value;
    const img = event.target.img.value;

    const testimonialTitle = {
      titleOne,
      img,
    };

    const url = `http://localhost:5000/testimonial-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonialTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div className="vh-100" >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleTitle}>
        <div class="container mt-5">
          <div class="justify-content-center align-items-baseline ">

            <div class="col-sm">
              <label className="mt-1">Enter Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title"
                  name="titleOne"
                  defaultValue={title.titleOne}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Image URL</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Image URL"
                  name="img"
                  defaultValue={title.img}
                />
              </div>
            </div>



            <div class="col-sm">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                <span>Update Title</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestimonialTitle;
