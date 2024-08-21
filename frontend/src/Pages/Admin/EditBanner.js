import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, [id]);

  const [user] = useAuthState(auth);

  const handleBanner = (event) => {
    event.preventDefault();
    const bannerHeadingText1 = event.target.bannerHeadingText1.value;
    const bannerImage = event.target.bannerImage.value;
    const typingHeading1 = event.target.typingHeading1.value;
    const typingHeading2 = event.target.typingHeading2.value;
    const typingHeading3 = event.target.typingHeading3.value;
    const bannerText = event.target.bannerText.value;
    const youtube = event.target.youtube.value;

    const updateBanner = {
      bannerHeadingText1,
      bannerImage,
      typingHeading1,
      typingHeading2,
      typingHeading3,
      bannerText,
      youtube,
    };

    const url = `http://localhost:5000/edit-banner/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form mb-15" onSubmit={handleBanner}>
        {banner.map((e) => (
          <div class="container">
            <div class="justify-content-center align-items-baseline">

              <div class="col-sm">
                <label className="mt-1">
                  Enter Banner Heading Text
                </label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Heading Text"
                    name="bannerHeadingText1"
                    defaultValue={e.bannerHeadingText1}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Banner Image</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Image"
                    name="bannerImage"
                    defaultValue={e.bannerImage}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Banner Typing Text(1)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(1)"
                    name="typingHeading1"
                    defaultValue={e.typingHeading1}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Banner Typing Text(2)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(2)"
                    name="typingHeading2"
                    defaultValue={e.typingHeading2}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Banner Typing Text(3)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(3)"
                    name="typingHeading3"
                    defaultValue={e.typingHeading3}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Banner Paragraph</label>
                <div class="form-group mb-3">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Paragraph"
                    name="bannerText"
                    defaultValue={e.bannerText}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Youtube Link</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Paragraph"
                    name="youtube"
                    defaultValue={e.youtube}
                  />
                </div>
              </div>

              <div class="col-sm">
                <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up m-5">
                  <span>Update Banner</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default EditBanner;
