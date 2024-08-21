import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateList = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAddList = (event) => {
    event.preventDefault();
    const listName = event.target.listName.value;
    const listCreatedBy = event.target.listCreatedBy.value;

    const list = {
      listName,
      listCreatedBy,
    };

    const url = `http://localhost:5000/add-list`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/my-leads");
        toast.success('List Created');
      });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="card-title text-center mb-4">Create New List</h3>
        <form onSubmit={handleAddList}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="listName"
              placeholder="List Name"
              required
            />
          </div>
          <input
            type="hidden"
            name="listCreatedBy"
            value={user?.email || ''}
          />
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
          >
            Add New List
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
