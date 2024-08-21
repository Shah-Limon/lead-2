import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${id}`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, [id]);

  const handleProfile = (event) => {
    event.preventDefault();

    const userPoint = event.target.userPoint.value;

    const profile = {
      userPoint,
    };

    const url = `http://localhost:5000/update-credit/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/manage-profiles/");
      });
  };

  return (
    <div className="mt-5 vh-100">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-5" onSubmit={handleProfile}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1 mb-15">Current Credit</label>
              <div class="form-group mb-3">
                <input
                  type="number"
                  
                  class="form-control"
                  name="userPoint"
                  defaultValue={profile.userPoint}
                />
              </div>
            </div>

            <div class="col-sm">
              <button
                type="submit"
                class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Credit</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;
