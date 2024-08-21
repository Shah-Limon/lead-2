import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const AddLeadsToMyList = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [lead, setLead] = useState({});
  const [lists, setLists] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/my-lead/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((info) => setLead(info))
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/lists`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  const handleAddList = (event) => {
    event.preventDefault();
    const leadAddedToList = event.target.leadAddedToList.value;

    const leadData = {
      leadAddedToList,
    };

    const url = `http://localhost:5000/my-update-lead/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(leadData),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/my-leads");
        toast.success("Lead Added to Your List");
      });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
        {lists.filter((list) => list.listCreatedBy === user?.email).length === 0 ? (
          <Link className="btn btn-primary w-100" to="/create-list">
            You don't have any lists. Create a New List
          </Link>
        ) : (
          <form onSubmit={handleAddList}>
            <h5 className="text-center mb-4">You are adding to {lead.personEmail}</h5>
            <div className="mb-3">
              <select name="leadAddedToList" className="form-select">
                {lists.filter(list => list.listCreatedBy === user?.email).map(list => (
                  <option key={list.listName} value={list.listName}>
                    {list.listName}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Add Lead to My Selected List
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddLeadsToMyList;
