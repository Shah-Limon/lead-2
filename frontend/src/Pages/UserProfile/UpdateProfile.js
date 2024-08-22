import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setProfile(info);
        setPreviewImage(info.profileImg); // Set initial preview image
      });
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a temporary URL for the file
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const fileInput = event.target.profileImg.files[0];
    try {
      let profileImg = profile.profileImg; // Keep existing image if no new image is uploaded

      if (fileInput) {
        const formData = new FormData();
        formData.append("image", fileInput);
        formData.append("key", "9b9a8d0dcddf9fdbc0d69db3ef376eac");

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        profileImg = imgbbResponse.data.data.url;
      }

      const userUpdate = {
        userName,
        profileImg,
      };

      const url = `http://localhost:5000/update-profile/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      })
        .then((res) => res.json())
        .then(() => {
          window.location.href = "/user-dashboard";
        });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="vh-100">
      <form className="form" onSubmit={handleUpdateProfile}>
        <div className="account-section bg-light-2 section-padding-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
                <div className="account-heading-block">
                  <div className="account-heading">
                    <h2 className="account-heading__title heading-md">
                      Update Profile
                    </h2>
                  </div>
                </div>
                <div className="account_comment-box">
                  <div className="account_comment-box__form-inner">
                    <div className="account_comment-box__form-input">
                      <h2 className="account-title">Your name</h2>
                      <input
                        type="text"
                        name="userName"
                        defaultValue={profile.userName}
                        placeholder="Enter your full name"
                        className="form-control bg-white"
                        required
                      />
                    </div>
                    <div className="account_comment-box__form-input">
                      <h2 className="account-title">Upload Profile Image</h2>
                      <input
                        type="file"
                        className="form-control bg-white"
                        name="profileImg"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {previewImage && (
                        <div className="mt-2">
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="account_comment-box__form-input-button">
                      <button type="submit" className="btn-masco rounded-pill w-100">
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
    </div>
  );
};

export default UpdateProfile;
