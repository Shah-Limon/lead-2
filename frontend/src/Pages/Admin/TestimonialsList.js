import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
const TestimonialsList = () => {
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials`)
      .then((res) => res.json())
      .then((info) => setTestimonial(info));
  }, []);

  let rowNumber = 1;

  const handleTestimonials = (event) => {
    event.preventDefault();
    const personName = event.target.personName.value;
    const personTitle = event.target.personTitle.value;
    const personImg = event.target.personImg.value;
    const desc = event.target.desc.value;

    const testimonial = {
      personName,
      personTitle,
      personImg,
      desc,
    };

    const url = `http://localhost:5000/testimonial`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/testimonials-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  return (
    <div>
      {/* <form class="form" onSubmit={handleTestimonials}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Enter Person Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Person Name"
                  name="personName"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Person Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Person Title"
                  name="personTitle"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Person Image</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Person Image"
                  name="personImg"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Testimonial Description</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Testimonial Description"
                  name="desc"
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                <span>Add Testimonial</span>
              </button>
            </div>
          </div>
        </div>
      </form> */}
      

{/* add title which are center */}
      <div className="container">

      <h3 className="text-center mb-15"> Testimonial List</h3>

      <div class="container">
        <div class="justify-content-center align-items-baseline mt-15"></div>
        <div class="col-sm">
          {title.map((e) => (
            <>
              <Link
                to={`/admin/edit-testimonial-title/${e._id}`}
                class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Testimonial Title</span>
              </Link>
            </>
          ))}
        </div>
      </div>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Person Name</th>

              <th>Edit</th>
            </tr>
            {testimonial.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.personName}</td>

                <td>
                  <Link to={`/admin/testimonial-edit/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialsList;
