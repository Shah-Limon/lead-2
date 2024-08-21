                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);



  const handlePackagesTitle = (event) => {
    event.preventDefault();
    const titleTop = event.target.titleTop.value;
    const titleOne = event.target.titleOne.value;
    const titleTwo = event.target.titleTwo.value;
    const description = event.target.description.value;

    const packageTitle = {
      titleTop,
      titleOne,
      titleTwo,
      description,
    };

    const url = `http://localhost:5000/edit-package-title/`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(packageTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };
 

  return (
    <div>
      <div className="container hight-full">
        <div class="col-sm mb-15">
        <BackToAdminDashboard></BackToAdminDashboard>
          {title.map((e) => (
            <Link to={`/package-title-edit/${e._id}`} className="btn-masco btn-masco--header rounded-pill btn-fill--up">
              <span>Edit Price Title</span>
             
            </Link>
          ))}
        </div>
        <table className="rwd-table">
          <div></div>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Package Name</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
            {packages.map((item, index) => (
              <tr key={item._id}>
                <td data-th="SL No.">{index + 1}</td>
                <td data-th="Package Name">{item.packageName}</td>
                <td data-th="Price">{item.price}$</td>
                <td data-th="Edit">
                  <Link to={`/admin/package-edit/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Packages;
