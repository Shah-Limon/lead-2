import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import "./CreateList.css";
import { useNavigate, useParams } from "react-router-dom";

const EditList = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const handleAddList = (event) => {
    event.preventDefault();
    const listName = event.target.listName.value;

    const list = {
      listName,
    };

    const url = `http://localhost:5000/edit-list/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/my-leads");
        alert("List Updated");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/list/${id}`)
      .then((res) => res.json())
      .then((info) => setList(info));
  }, [id]);

  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center p-5">
        <div className="text-center dashboard-card">
          <form onSubmit={handleAddList} className="col-lg-8">
            <input
              className="list-input"
              type="text"
              name="listName"
              defaultValue={list.listName}
              placeholder="List Name"
            ></input>
            <br></br>

            <div className="d-flex justify content-center list-input">
              <input
                className="btn btn-primary mt-5 w-100 p-3"
                type="submit"
                value="Update"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditList;
