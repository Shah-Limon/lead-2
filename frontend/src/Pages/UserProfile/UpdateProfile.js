import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const userName = event.target.userName.value;
    const profileStatus = event.target.profileStatus.value;
    const userPoint = event.target.userPoint.value;
    const userEmail = event.target.userEmail.value;
    const fileInput = event.target.profileImg.files[0];
    // Upload the image to imgbb
    try {
      const formData = new FormData();
      formData.append("image", fileInput);
      formData.append("key", "9b9a8d0dcddf9fdbc0d69db3ef376eac");

      const imgbbResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      const profileImg = imgbbResponse.data.data.url;
      const userUpdate = {
        userName,
        profileImg,
        profileStatus,
        userPoint,
        userEmail,
      };
      const url = `http://localhost:5000/add-profile-info`;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      })
        .then((res) => res.json())
        .then((result) => {
          navigate("/user-dashboard");
        });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div
      className="vh-100 mt-5"
   
    >
      {
        profile.filter(pro => pro.userEmail === user?.email).length === 0 &&
        <form class="form" onSubmit={handleUpdateProfile}>
          <div className="col-sm">
            <div className="form-group mb-3">
              <input
                hidden
                type="number"
                className="form-control"
                value="100"
                name="userPoint"
              />
              <input
                hidden
                type="text"
                className="form-control"
                value="Approved"
                name="profileStatus"
              />
            </div>
          </div>
          <div class="account-section bg-light-2 section-padding-120">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
                  <div class="account-heading-block">
                    <div class="account-heading">
                      <h2 class="account-heading__title heading-md">
                        Update Profile
                      </h2>
                    </div>
                  </div>
                  <div class="account_comment-box">
                    <div class="account_comment-box__form-inner">
                      <div class="account_comment-box__form-input">
                        <h2 class="account-title">Your name</h2>
                        <input
                          type="text"
                          name="userName"
                          defaultValue={user?.displayName}
                          id="name"
                          placeholder="Enter your full name"
                          className="form-control bg-white"
                          required
                        />
                      </div>
                      <div class="account_comment-box__form-input">
                        <h2 class="account-title">Upload Profile Image</h2>
                        <input
                          type="file"
                          className="form-control bg-white"
                          name="profileImg"
                          accept="image/*"
                        />
                      </div>
                      <div class="account_comment-box__form-input">
                        <h2 class="account-title">Email*</h2>
                        <input
                          disabled
                          type="email"
                          value={user?.email}
                          name="userEmail"
                          placeholder="Enter your email"
                          className="form-control bg-white"
                          required
                        />
                      </div>
                      <div class="account_comment-box__form-input-button">
                        <button type="submit" class="btn-masco rounded-pill w-100">
                          Update Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
      {
        profile.filter(pro => pro.userEmail === user?.email).length === 1 &&
        <h3 className="vh-100 d-flex justify-content-center align-items-center"><Link to='/user-dashboard'>You have already an account</Link></h3>
      }
    </div>
  );
};

export default UpdateProfile;
