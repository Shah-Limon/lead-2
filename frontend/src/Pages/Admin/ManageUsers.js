import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import BackToAdminDashboard from "./BackToAdminDashboard";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setUsers(info));
  }, []);

  const handleAddUsers = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userRole = event.target.userRole.value;
    const edit = {
      userName,
      userEmail,
      userRole,
    };

    const url = `http://localhost:5000/add-user`;
    fetch(url, {
      method: "POST",
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
  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        navigate(`/admin/dashboard`);
      });
  };
  return (
    <div
    className="mb-5"
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <div className="container">
        <h5 className="text-center mt-15">Manage Users</h5>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Website Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete user</th>
            </tr>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td data-th="Website Name">{user.userName}</td>
                <td data-th="Email">{user.userEmail}</td>
                <td data-th="Role">{user.userRole}</td>
                <td data-th="Edit">
                  <Link to={`/admin/user/${user._id}`}>Edit User</Link>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-outline-danger" onClick={() => handleDeleteUser(user._id)}>
                    Delete user
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAddUsers} class="form">
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">User Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your Email"
                  name="userName"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">User Email</label>
              <div class="form-group">
                <input type="text" class="form-control" name="userEmail" />
              </div>
              <div class="col-sm">
                <label className="mt-1">User Role</label>
                <div class="form-group">
                  <select
                    id="selectOption"
                    class="form-control"
                    name="userRole"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <button type="submit" class="btn-masco btn-masco--header rounded-pill btn-fill--up mt-5">
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageUsers;
