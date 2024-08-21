import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPackage] = useState([]);
  const [user] = useAuthState(auth);
  const [imgUrl, setImgUrl] = useState(p.img || "");
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=9b9a8d0dcddf9fdbc0d69db3ef376eac",
        formData
      );
      setImgUrl(response.data.data.url);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/package/${id}`)
      .then((res) => res.json())
      .then((info) => setPackage(info));
    setImgUrl(p.img || "");
  }, []);

  let rowNumber = 1;

  const handlePackages = (event) => {
    event.preventDefault();
    const packageName = event.target.packageName.value;
    const price = event.target.price.value;
    const totalCredits = event.target.totalCredits.value;

    const pointOne = event.target.pointOne.value;
    const pointTwo = event.target.pointTwo.value;
    const pointThree = event.target.pointThree.value;
    const pointFour = event.target.pointFour.value;
    const pointFive = event.target.pointFive.value;
    const pointSix = event.target.pointSix.value;

    const websiteCheck = {
      packageName,
      price,
      img: imgUrl,
      totalCredits,
      pointOne,
      pointTwo,
      pointThree,
      pointFour,
      pointFive,
      pointSix,
    };

    const url = `http://localhost:5000/edit-package/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(websiteCheck),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/packages/");
      });
  };

  return (
    <div className="mt-5">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-5" onSubmit={handlePackages}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1 mb-15">Package Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Package Name"
                  name="packageName"
                  defaultValue={p.packageName}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Package Price</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  defaultValue={p.price}
                  placeholder="Enter Package Price"
                  name="price"
                />
              </div>
            </div>

            <div class="col-sm">
              <label className="mt-1">Total Credits</label>
              <div class="form-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Total Credits"
                  name="totalCredits"
                  defaultValue={p.totalCredits}
                />
              </div>
            </div>

            {/* new */}
            <div class="col-sm">
              <label className="mt-1">Point One</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point One"
                  name="pointOne"
                  defaultValue={p.pointOne}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Point Two</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point Two"
                  name="pointTwo"
                  defaultValue={p.pointTwo}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Point Three</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point Three"
                  name="pointThree"
                  defaultValue={p.pointThree}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Point Four</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point Four"
                  name="pointFour"
                  defaultValue={p.pointFour}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Point Five</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point Five"
                  name="pointFive"
                  defaultValue={p.pointFive}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Point Six</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Point Six"
                  name="pointSix"
                  defaultValue={p.pointSix}
                />
              </div>
            </div>

            <div class="col-sm">
              <button
                type="submit"
             className="btn-masco btn-masco--header rounded-pill btn-fill--up"
              >
                <span>Update Package</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
