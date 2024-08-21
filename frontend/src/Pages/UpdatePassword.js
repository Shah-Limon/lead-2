import React, { useRef, useState } from "react";
import { updatePassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const ChangePassword = () => {
  const { currentUser } = useAuthState(auth); // Assuming useAuthState comes from 'react-firebase-hooks/auth'
  const [loading, setLoading] = useState(false); // Define loading state

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error("Passwords do not match");
      }
      await updatePassword(currentUser, passwordRef.current.value);
      // The rest of your code for updating the password
    } catch (error) {
      // The rest of your code for error handling
    }
    setLoading(false); // Set loading state to false
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Please Enter your new Password:</p>
        <input type="password" placeholder="New Password" ref={passwordRef} />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
      </div>
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePassword;
