import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [logo, setLogo] = useState([]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setResetError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setResetError("Invalid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setResetError(null);
    } catch (error) {
      console.error("Error sending password reset email", error);
      setResetError("Error sending password reset email. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info))
      .catch((error) => console.error("Error fetching logo", error));
  }, []);

  return (
    <div className="account-section bg-light-2 section-padding-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
            <div className="account-heading-block">
              <a href="index.html" className="account-brand d-block">
                <img src="./image/icons/brand.svg" alt="masco" />
              </a>
              <div className="account-heading">
                <h2 className="account-heading__title heading-md">
                  Reset Password
                </h2>
                <p>Enter your email address to reset your password</p>
              </div>
            </div>
            <form className="account_comment-box" onSubmit={handleResetPassword}>
              <div className="account_comment-box__form-inner">
                <div className="account_comment-box__form-input">
                  <h2 className="account-title">Email address</h2>
                  <input
                    className="form-control bg-white"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                  />
                </div>
                {resetError && (
                  <div className="text-center mb-4">
                    <h5>{resetError}</h5>
                  </div>
                )}
                {resetSent ? (
                  <div className="text-center mb-4">
                    <h3>Password reset. Check your inbox!</h3>
                  </div>
                ) : (
                  <>
                    <div className="account_comment-box__form-input-button">
                      <button type="submit" className="btn-masco rounded-pill w-100">
                        Send Reset Email
                      </button>
                    </div>
                  </>
                )} 
                <div className="button-bottom-text">
                  <span>
                    Already have an account?
                    <Link to="/login">Sign in now</Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
