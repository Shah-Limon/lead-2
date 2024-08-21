import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const User = () => {
  const { id } = useParams();
  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find((user) => user._id === id);
        if (user) {
          setMember(user);
        }
      });  
  }, [id]);
  

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userRole = event.target.userRole.value;
    const userUpdate = {
      userName,
      userEmail,
      userRole,
    };
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userUpdate),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/dashboard`);
      });
  };

  return (
    <div
     className="hight-full"
      
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form onSubmit={handleUpdateUser} class="form">
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">User Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  defaultValue={member.userName}
                  name="userName"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">User Email</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="userEmail"
                  defaultValue={member.userEmail}
                />
              </div>
              <div class="col-sm">
                <label className="mt-1">User Role</label>
                <div class="form-group">
                  <select
                    id="selectOption"
                    class="form-control"
                    defaultValue={member.userRole}
                    name="userRole"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up m-5">
                <span>Update User</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default User;
