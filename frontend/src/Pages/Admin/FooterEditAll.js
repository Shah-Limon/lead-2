import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
const FooterEditAll = () => {
  const navigate = useNavigate();
  const { id } = useParams();



  const handleFooter = (event) => {
    event.preventDefault();
    const facebook = event.target.facebook.value;
    const twitter = event.target.twitter.value;
    const instragram = event.target.instragram.value;
    const youtube = event.target.youtube.value;

    const footerSocial = {
      facebook,
      twitter,
      instragram,
      youtube
    };

    const url = `http://localhost:5000/footer-social/`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  const handleLinks = (event) => {
    event.preventDefault();
    const linkOne = event.target.linkOne.value;
    const linkTwo = event.target.linkTwo.value;
    const linkThree = event.target.linkThree.value;
    const linkFour = event.target.linkFour.value;
    const linkFive = event.target.linkFive.value;

    const footerLink = {
        linkOne,
        linkTwo,
        linkThree,
        linkFour,
        linkFive
    };

    const url = `http://localhost:5000/footer-link`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerLink),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };




  return (
    <div>
      <form class="form" onSubmit={handleFooter}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="mb-15">Update Social Account</h4>
            <div class="col-sm">
              <label className="mt-1">Enter Facebook Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Facebook Link"
                  name="facebook"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Twiiter Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Twiiter Link"
                  name="twitter"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Instragram Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Instragram Link"
                  name="instragram"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Youtube Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Youtube Link"
                  name="youtube"
                />
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

      <form class="form mb-15" onSubmit={handleLinks}>
        <h4 className="mb-15">Update Links</h4>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Enter Link One</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link One"
                  name="linkOne"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Two</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Two"
                  name="linkTwo"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Three</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Three"
                  name="linkThree"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Four</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Four"
                  name="linkFour"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Five</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Five"
                  name="linkFive"
                />
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

      <section className="participants">
        <div className="container">
          <div className="row">
          <div className="col-lg-4">
              <div className="block-text center">
                <div className="col">
                  <h5 className="heading">Footer Social Options</h5>

                  <Link className="btn circle btn-theme-effect btn-sm">
                    <span>update</span>
                  </Link>

                  <hr></hr>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-text center">
                <div className="col">
                  <h5 className="heading">Footer Links Options</h5>

                  <Link className="btn circle btn-theme-effect btn-sm">
                    <span>update</span>
                  </Link>

                  <hr></hr>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterEditAll;
