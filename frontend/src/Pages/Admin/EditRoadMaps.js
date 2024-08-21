import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditRoadMaps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [road, SetRoad] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/road/`)
      .then((res) => res.json())
      .then((info) => SetRoad(info));
  }, []);

  const [user] = useAuthState(auth);

  const handleWhyEdit = (event) => {
    event.preventDefault();
    const titleToptext = event.target.titleToptext.value;
    const bannerHeadingText1 = event.target.bannerHeadingText1.value;
    const bannerHeadingText2 = event.target.bannerHeadingText2.value;

    const cardTitleOne = event.target.cardTitleOne.value;
    const cardDescOne = event.target.cardDescOne.value;

    const cardTitleTwo = event.target.cardTitleTwo.value;
    const cardDescTwo = event.target.cardDescTwo.value;

    const cardTitleThree = event.target.cardTitleThree.value;
    const cardDescThree = event.target.cardDescThree.value;

    const cardTitleFour = event.target.cardTitleFour.value;
    const cardDescFour = event.target.cardDescFour.value;

    const cardTitleFive = event.target.cardTitleFive.value;
    const cardDescFive = event.target.cardDescFive.value;

    const updateRoad = {
      titleToptext,
      bannerHeadingText1,
      bannerHeadingText2,

      cardTitleOne,
      cardDescOne,

      cardTitleTwo,
      cardDescTwo,

      cardTitleThree,
      cardDescThree,

      cardTitleFour,
      cardDescFour,

      cardTitleFive,
      cardDescFive,
    };

    const url = `http://localhost:5000/edit-road/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateRoad),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form mb-30" onSubmit={handleWhyEdit}>
        {road.map((e) => (
          <div class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Title Top Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title Top Text"
                    name="titleToptext"
                    defaultValue={e.titleToptext}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Heading Text(1st Line)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Heading Text(1sT Line)"
                    name="bannerHeadingText1"
                    defaultValue={e.bannerHeadingText1}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Heading Text(2nd Line)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Heading Text(1sT Line)"
                    name="bannerHeadingText2"
                    defaultValue={e.bannerHeadingText2}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (One)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (One)"
                    name="cardTitleOne"
                    defaultValue={e.cardTitleOne}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Description (One)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (One)"
                    name="cardDescOne"
                    defaultValue={e.cardDescOne}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Two)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Two)"
                    name="cardTitleTwo"
                    defaultValue={e.cardTitleTwo}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Two)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Two)"
                    name="cardDescTwo"
                    defaultValue={e.cardDescTwo}
                  />
                </div>
              </div>

              {/* Three */}

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Three)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Three)"
                    name="cardTitleThree"
                    defaultValue={e.cardTitleThree}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Three)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Three)"
                    name="cardDescThree"
                    defaultValue={e.cardDescThree}
                  />
                </div>
              </div>

              {/* Four */}

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Four)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Four)"
                    name="cardTitleFour"
                    defaultValue={e.cardTitleFour}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Four)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Four)"
                    name="cardDescFour"
                    defaultValue={e.cardDescFour}
                  />
                </div>
              </div>

              {/* Five */}

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Five)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Five)"
                    name="cardTitleFive"
                    defaultValue={e.cardTitleFive}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Five)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Five)"
                    name="cardDescFive"
                    defaultValue={e.cardDescFive}
                  />
                </div>
              </div>

              <div class="col-sm">
                <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                  <span>Update Road Map</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default EditRoadMaps;
