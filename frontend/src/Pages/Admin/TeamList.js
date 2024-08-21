import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import BackToAdminDashboard from "./BackToAdminDashboard";

const TeamList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("9b9a8d0dcddf9fdbc0d69db3ef376eac");

  useEffect(() => {
    fetch(`http://localhost:5000/teams`)
      .then((res) => res.json())
      .then((info) => setTeam(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/team-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);

  let rowNumber = 1;

  const addFeature = async (event) => {
    event.preventDefault();

    const personName = event.target.personName.value;
    const personTitle = event.target.personTitle.value;
    const facebook = event.target.facebook.value;
    const twitter = event.target.twitter.value;

    let personImg = imageFile ? imagePreview : "";
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        personImg = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return; // Don't proceed if image upload fails
      }
    }

    const teamData = {
      personName,
      personImg,
      personTitle,
      facebook,
      twitter,
    };

    const url = `http://localhost:5000/add-team`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-30" onSubmit={addFeature}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Add Feature</span>
            </h4>
            <div className="col-sm">
              <label className="mt-1">Enter Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Description</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                />
              </div>
            </div>

            <div className="col-sm">
              <label className="mt-1">Enter Facebook Link</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Facebook Link"
                  name="facebook"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Twitter Link</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Twitter Link"
                  name="twitter"
                />
              </div>
            </div>

            <div className="col-sm">
              <button
                type="submit"
                className="btn circle btn-theme-effect btn-sm"
              >
                <span>Add Team Member</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="container">
        <div className="justify-content-center align-items-baseline">
          <div className="col-sm">
            {title.map((e) => (
              <Link
                to={`/admin/edit-team-title/${e._id}`}
                type="submit"
                className="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5"
              >
                <span>Update Team Section Title</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Team Person Name</th>
              <th>Edit</th>
            </tr>
            {team.map((item) => (
              <tr key={item._id}>
                <td>{rowNumber++}</td>
                <td>{item.personName}</td>
                <td data-th="Edit">
                  <Link to={`/admin/team-edit/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamList;
