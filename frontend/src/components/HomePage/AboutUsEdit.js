import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const SpecialityOptionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [about, setAbout] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [storedImage, setStoredImage] = useState("");
  const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac"; // Your imgbb API key

  const handleEditAbout = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const subText = event.target.subText.value;
    const btnText = event.target.btnText.value;
    const btnUrl = event.target.btnUrl.value;

    // Use a let variable for img to allow reassignment
    let img = imageFile ? imagePreview : storedImage;

    // If an image is being uploaded, send it to imgbb
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        img = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return; // Don't proceed if image upload fails
      }
    }

    const updateAbout = {
      img,
      title,
      subText,
      btnText,
      btnUrl,
    };

    const url = `http://localhost:5000/edit-about/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateAbout),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/about/${id}`)
      .then((res) => res.json())
      .then((info) => {
        const storedImg = info[0].img;
        setAbout(info);
        setStoredImage(storedImg);
      });
  }, [id]);

  return (
    <div
      className="vh-100"
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form onSubmit={handleEditAbout}>
        {about.map((e) => (
          <div class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Banner Image</label>
                <div class="form-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Images Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {!imageFile && !imagePreview && storedImage && (
                  <img
                    src={storedImage}
                    alt="Storeds"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
              <div class="col-sm">
                <label className="mt-1">Banner Title</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Banner Title"
                    name="title"
                    defaultValue={e.title}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Banner About Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Sub Text"
                    name="subText"
                    defaultValue={e.subText}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Banner Button Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Button Text"
                    name="btnText"
                    defaultValue={e.btnText}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Banner Button URL</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Button URL"
                    name="btnUrl"
                    defaultValue={e.btnUrl}
                  />
                </div>
              </div>
              <div class="col-sm">
                <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                  <span>Update About</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default SpecialityOptionEdit;
