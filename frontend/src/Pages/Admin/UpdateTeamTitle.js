import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const TeamList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/team-title`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);

  const handleTeamTitle = (event) => {
    event.preventDefault();
    const titleTopText = event.target.titleTopText.value;
    const TitleOne = event.target.TitleOne.value;
    const titleTwo = event.target.titleTwo.value;

    const updateTeamTitle = {
      titleTopText,
      TitleOne,
      titleTwo,
    };

    const url = `http://localhost:5000/edit-team-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateTeamTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div className="vh-100">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleTeamTitle}>
        {title.map((e) => (
          <div key={e._id} class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Title Top Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Title Top Text"
                    name="titleTopText"
                    defaultValue={e.titleTopText}
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
                    name="TitleOne"
                    defaultValue={e.TitleOne}
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
                    defaultValue={e.titleTwo}
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
        ))}
      </form>
    </div>
  );
};

export default TeamList;
