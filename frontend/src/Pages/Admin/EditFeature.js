import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/feature/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setFeature(info);
        if (info.featureImg) {
          setImagePreview(info.featureImg);
        }
      });
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFeature = async (event) => {
    event.preventDefault();

    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;


    let featureImg = imagePreview;
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // Upload the image to ImgBB using the ImgBB API key
      const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac";
      const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

      try {
        const response = await fetch(imgbbUploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          featureImg = data.data.url;
        } else {
          alert("Image upload failed.");
          return;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    }

    const updatedFeature = {
      featureDesc,
      featureTitle,
      featureImg,
    };

    const url = `http://localhost:5000/feature/${id}`;
    try {
      const sliderResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeature),
      });

      if (sliderResponse.ok) {
        navigate("/admin/setting");
      } else {
        alert("Failed to update feature.");
      }
    } catch (error) {
      console.error("Error updating feature: ", error);
    }
  };

  return (
    <div>
      <BackToAdminDashboard />
      <form className="form mb-15 vh-100" onSubmit={handleFeature}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Edit Features</span>
            </h4>

            <div className="col-sm">
              <label className="mt-1">Enter Feature Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="featureTitle"
                  defaultValue={feature.featureTitle}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Feature Short Description</label>
              <div className="form-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Short Description"
                  name="featureDesc"
                  defaultValue={feature.featureDesc}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Feature Image</label>
              <div className="form-group mb-3">
                <input
                  className="form-control bg-light-2"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {imagePreview && (
                <div className="form-group mb-3">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>

            <div className="col-sm mt-5">
              <button
                type="submit"
                className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Feature</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFeature;
