import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
const EditFaqTitle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const { id } = useParams();

  const [faqTitle, setFaqTitle] = useState([]);
 
  useEffect(() => {
    fetch(`http://localhost:5000/faq-title/${id}`)
      .then((res) => res.json())
      .then((info) => setFaqTitle(info));
  }, [id]);

  let rowNumber = 1;

  const handleTitle = (event) => {
    event.preventDefault();
    const titleTopText = event.target.titleTopText.value;
    const titleOne = event.target.titleOne.value;
    const titleTwo = event.target.titleTwo.value;

    const testimonialTitle = {
      titleTopText,
      titleOne,
      titleTwo,
    };

    const url = `http://localhost:5000/faq-title/${id}/`;
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
    <div>
        <form class="form" onSubmit={handleTitle}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Title Top Text</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Title Top Text"
                  name="titleTopText"
                  defaultValue={faqTitle.titleTopText}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Title (1st part)</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title (1st part)"
                  name="titleOne"
                  defaultValue={faqTitle.titleOne}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Title (2st part)</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title (2st part)"
                  name="titleTwo"
                  defaultValue={faqTitle.titleTwo}
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

export default EditFaqTitle;
