import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom/dist";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditWebsite = () => {
  const [website, setWebsite] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/website/${id}`)
      .then((res) => res.json())
      .then((info) => setWebsite(info));
  }, [id]);

  const handleEditWebsite = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const auditStatus = event.target.auditStatus.value;
    const website = event.target.website.value;
    const metaDescription = event.target.metaDescription.value;
    const mobileFriendly = event.target.mobileFriendly.value;
    const pageLoadSpeed = event.target.pageLoadSpeed.value;
    const ssl = event.target.ssl.value;
    const sitemap = event.target.sitemap.value;
    const brokenLinks = event.target.brokenLinks.value;
    const ux = event.target.ux.value;
    const backlinks = event.target.backlinks.value;
    const img = event.target.img.value;
    const pdfLink = event.target.pdfLink.value;

    const edit = {
      email,
      auditStatus,
      website,
      metaDescription,
      mobileFriendly,
      pageLoadSpeed,
      ssl,
      sitemap,
      brokenLinks,
      ux,
      backlinks,
      img,
      pdfLink,

    };

    const url = `http://localhost:5000/edit-website/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/dashboard`);
      });
  };
  const pdfLink = website.pdfLink || "Default Text If No PDF Link";
  console.log("pdfLink:", pdfLink);
  return (
    <div className="mb-15">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form onSubmit={handleEditWebsite} class="form">

        <div class="container">
          <div class="justify-content-center align-items-baseline">
          <input hidden required type="text" name="auditStatus" value="Complete"/>
            <div class="col-sm">
              <label className="mt-1">Email</label>
              <div class="form-group mb-3">
                <input
                  type="email"
                  readOnly
                  class="form-control"
                  placeholder="Your Email"
                  name="email"
                  value={website.email}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Website</label>
              <div class="form-group">
                <input
                readOnly
                  type="text"
                  class="form-control"
                  defaultValue={website.website}
                  name="website"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Meta describtion</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Meta describtion"
                  name="metaDescription"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Mobile-Friendly</label>
              <div class="form-group">
                <select
                  id="selectOption"
                  class="form-control"
                  name="mobileFriendly"
                >
                  <option disabled>Select Mobile Friendly</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div class="col-sm">
              <label className="mt-3">Page Load Speed</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="pageLoadSpeed"
                  value={website.pageLoadSpeed}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Enable SSL</label>
              <div class="form-group">
                <select id="selectOption" class="form-control" name="ssl">
                  <option disabled>Enable SSL</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Sitemap</label>
              <div class="form-group">
                <input type="text" class="form-control" name="sitemap" />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Broken Links</label>
              <div class="form-group">
                <input type="text" class="form-control" name="brokenLinks" />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">User Experience (UX)</label>
              <div class="form-group">
                <select id="selectOption" class="form-control" name="ux">
                  <option disabled>User Experience (UX)</option>
                  <option value="veryGood">Very Good</option>
                  <option value="good">Good</option>
                  <option value="medium">Medium</option>
                  <option value="bad">Bad</option>
                </select>
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Backlinks</label>
              <div class="form-group">
                <input type="number" class="form-control" name="backlinks" />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Optimize images</label>
              <div class="form-group">
                <select id="selectOption" class="form-control" name="img">
                  <option disabled>selct</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-3">Add PDF file</label>
              <input
                type="text"
                className="form-control"
                name="pdfLink"
                defaultValue={website.pdfLink}
              />
            </div>

            <div class="col-sm">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditWebsite;
