import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const UpdateLogo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogoUpload = async (event) => {
    event.preventDefault();
    const logoFile = event.target.logo.files[0];

    if (!logoFile) {
      // Handle case where no file is selected.
      return;
    }

    // Upload the logo to ImgBB and get the URL
    const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac"; // Replace with your ImgBB API key
    const formData = new FormData();
    formData.append("image", logoFile);

    try {
      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=" + imgbbApiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (imgbbResponse.ok) {
        const imgbbData = await imgbbResponse.json();
        const logoUrl = imgbbData.data.url;

        // Update the logo URL in your MongoDB server
        const updateData = {
          logo: logoUrl,
        };

        const url = `http://localhost:5000/logo/${id}`;
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (updateResponse.ok) {
          navigate("/admin/setting-general/");
        } else {
          // Handle the case where the update to MongoDB fails
        }
      } else {
        // Handle the case where ImgBB upload fails
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error:", error);
    }
  };

  return (
    <div className="vh-100">
      <form className="form" onSubmit={handleLogoUpload}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Upload Logo</label>
              <div className="form-group mb-3">
                <input type="file" className="form-control" name="logo" />
              </div>
            </div>

            <div className="col-sm mt-5">
              <button type="submit" className="btn-masco btn-masco--header rounded-pill btn-fill--up m-5">
                <span>Upload Logo</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLogo;
