import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const ManagerRoute = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.reverse()));
  }, []);

  // Check if the user's email matches an Manager 
  const isAdminOrManager = users.some((u) => {
    return (
      user?.email === u.userEmail &&
      (u.userRole === "Admin" || u.userRole === "Manager")
    );
  });

  return isAdminOrManager ? (
    children
  ) : (
    <div className="text-center vh-100"><h4>You are not authorized to access this page.<br></br>(your are not admin or Manager)</h4></div>
  );
};

export default ManagerRoute;
