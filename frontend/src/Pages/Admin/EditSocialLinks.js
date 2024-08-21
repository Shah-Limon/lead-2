import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const EditSocialLinks = () => {
  const [social, setSocial] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    fetch(`http://localhost:5000/footer-social/${id}`)
      .then((res) => res.json())
      .then((info) => setSocial(info));
  }, [id]);


  const handleFooter = (event) => {
    event.preventDefault();
    const facebook = event.target.facebook.value;
    const twitter = event.target.twitter.value;
    const instragram = event.target.instragram.value;
    const youtube = event.target.youtube.value;
    const email = event.target.email.value;

    const footerSocial = {
      facebook,
      twitter,
      instragram,
      youtube,
      email
    };

    const url = `http://localhost:5000/footer-social/${id}`;
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
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form mb-15" onSubmit={handleFooter}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="mb-15">Update Social Account</h4>
            <div class="col-sm">
              <label className="mt-1">Enter Facebook Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Facebook Link"
                  name="facebook"
                  defaultValue={social.facebook}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Twiiter Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Twiiter Link"
                  name="twitter"
                  defaultValue={social.twitter}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Instragram Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Instragram Link"
                  name="instragram"
                  defaultValue={social.instragram}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Youtube Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Youtube Link"
                  name="youtube"
                  defaultValue={social.youtube}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Email</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Email"
                  name="email"
                  defaultValue={social.email}
                />
              </div>
            </div>

            <div class="col-sm mb-5">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSocialLinks;
