import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const WhyChooseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [choose, SetChoose] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/why-choose/`)
      .then((res) => res.json())
      .then((info) => SetChoose(info[0]));
  }, []);

  const handleWhyEdit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const image = event.target.image.value;

    const TitleBoxOne = event.target.TitleBoxOne.value;
    const ImageBoxOne = event.target.ImageBoxOne.value;
    const ParaBoxOne = event.target.ParaBoxOne.value;

    const TitleBoxTwo = event.target.TitleBoxTwo.value;
    const ImageBoxTwo = event.target.ImageBoxTwo.value;
    const ParaBoxTwo = event.target.ParaBoxTwo.value;

    const TitleBoxThree = event.target.TitleBoxThree.value;
    const ImageBoxThree = event.target.ImageBoxThree.value;
    const ParaBoxThree = event.target.ParaBoxThree.value;

    const chooseData = {
      title,
      image,
      TitleBoxOne,
      ImageBoxOne,
      ParaBoxOne,
      TitleBoxTwo,
      ImageBoxTwo,
      ParaBoxTwo,
      TitleBoxThree,
      ImageBoxThree,
      ParaBoxThree,
    };

    const url = `http://localhost:5000/edit-why-choose/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chooseData),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div className="default-padding">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-15" onSubmit={handleWhyEdit}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Title Text</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Banner Text"
                  name="title"
                  defaultValue={choose.title}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Image URL</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Image URL"
                  name="image"
                  defaultValue={choose.image}
                />
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Point One</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxOne"
                        defaultValue={choose.TitleBoxOne}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxOne"
                        defaultValue={choose.ParaBoxOne}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Image</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxOne"
                        defaultValue={choose.ImageBoxOne}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Point Two</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxTwo"
                        defaultValue={choose.TitleBoxTwo}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxTwo"
                        defaultValue={choose.ParaBoxTwo}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Image URL</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxTwo"
                        defaultValue={choose.ImageBoxTwo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-deck mt-5">
              <div className="card">
                <div className="card-body m-5">
                  <h5 className="card-title">Point Three</h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Title</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        name="TitleBoxThree"
                        defaultValue={choose.TitleBoxThree}
                        className="form-control"
                        placeholder="Enter Banner Title"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Paragraph</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Paragraph"
                        name="ParaBoxThree"
                        defaultValue={choose.ParaBoxThree}
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <label className="mt-1">Enter Box Banner Image</label>{" "}
                      <hr></hr>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Box Banner Image"
                        name="ImageBoxThree"
                        defaultValue={choose.ImageBoxThree}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm">
              <button
                type="submit"
                className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Why Choose</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WhyChooseEdit;
