import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const SpecialityOptionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [speciality, SetSpeciality] = useState([]);

  const handleEditSpeciality = (event) => {
    event.preventDefault();
    const headingTitle = event.target.headingTitle.value;
    const subText = event.target.subText.value;
    const TitleBoxOne = event.target.TitleBoxOne.value;
    const ParaBoxOne = event.target.ParaBoxOne.value;
    const ImageBoxOne = event.target.ImageBoxOne.value;
    const TitleBoxTwo = event.target.TitleBoxTwo.value;
    const ParaBoxTwo = event.target.ParaBoxTwo.value;
    const ImageBoxTwo = event.target.ImageBoxTwo.value;
    const TitleBoxThree = event.target.TitleBoxThree.value;
    const ParaBoxThree = event.target.ParaBoxThree.value;
    const ImageBoxThree = event.target.ImageBoxThree.value;
    const TitleBoxFour = event.target.TitleBoxFour.value;
    const ParaBoxFour = event.target.ParaBoxFour.value;
    const ImageBoxFour = event.target.ImageBoxFour.value;

    const updateSpeciality = {
      headingTitle,
      subText,
      TitleBoxOne,
      ParaBoxOne,
      ImageBoxOne,
      TitleBoxTwo,
      ParaBoxTwo,
      ImageBoxTwo,
      TitleBoxThree,
      ParaBoxThree,
      ImageBoxThree,
      TitleBoxFour,
      ParaBoxFour,
      ImageBoxFour,
    };

    const url = `http://localhost:5000/edit-speciality/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSpeciality),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/speciality/${id}`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info));
  }, [id]);

  return (
    <div
  
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      {speciality.map((e) => (
        <form onSubmit={handleEditSpeciality}>
          <div class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Enter Title </label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Heading Title One"
                    name="headingTitle"
                    defaultValue={e.headingTitle}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Description</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Description"
                    name="subText"
                    defaultValue={e.subText}
                  />
                </div>
              </div>

              <div className="card-deck mt-5">
                <div className="card">
                  <div className="card-body m-5">
                    <h5 className="card-title">Card One</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Title</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          name="TitleBoxOne"
                          defaultValue={e.TitleBoxOne}
                          className="form-control"
                          placeholder="Enter Banner Title"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">
                          Enter Box Banner Paragraph
                        </label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Paragraph"
                          name="ParaBoxOne"
                          defaultValue={e.ParaBoxOne}
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
                          defaultValue={e.ImageBoxOne}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-deck mt-5">
                <div className="card">
                  <div className="card-body m-5">
                    <h5 className="card-title">Card Two</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Title</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          name="TitleBoxTwo"
                          defaultValue={e.TitleBoxTwo}
                          className="form-control"
                          placeholder="Enter Banner Title"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">
                          Enter Box Banner Paragraph
                        </label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Paragraph"
                          name="ParaBoxTwo"
                          defaultValue={e.ParaBoxTwo}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Image</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Image"
                          name="ImageBoxTwo"
                          defaultValue={e.ImageBoxTwo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-deck mt-5">
                <div className="card">
                  <div className="card-body m-5">
                    <h5 className="card-title">Card Three</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Title</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          name="TitleBoxThree"
                          defaultValue={e.TitleBoxThree}
                          className="form-control"
                          placeholder="Enter Banner Title"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">
                          Enter Box Banner Paragraph
                        </label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Paragraph"
                          name="ParaBoxThree"
                          defaultValue={e.ParaBoxThree}
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
                          defaultValue={e.ImageBoxThree}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-deck mt-5">
                <div className="card">
                  <div className="card-body m-5">
                    <h5 className="card-title">Card Four</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Title</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          name="TitleBoxFour"
                          defaultValue={e.TitleBoxFour}
                          className="form-control"
                          placeholder="Enter Banner Title"
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">
                          Enter Box Banner Paragraph
                        </label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Paragraph"
                          name="ParaBoxFour"
                          defaultValue={e.ParaBoxFour}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-4">
                        <label className="mt-1">Enter Box Banner Image</label>{" "}
                        <hr></hr>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Box Banner Image"
                          name="ImageBoxFour"
                          defaultValue={e.ImageBoxFour}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm">
                <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default SpecialityOptionEdit;
