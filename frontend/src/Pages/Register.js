import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const navigate = useNavigate();

  let signInError;

  const onSubmit = async (data) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(data.email, data.password);

      if (userCredential.user) {
        // User created successfully
        // Update profile with display name
        await updateProfile({ displayName: data.name });

        // Default image URL
        const defaultImgUrl = "https://firebasestorage.googleapis.com/v0/b/mobile-app-d6c0d.appspot.com/o/images%2Fpng-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png?alt=media&token=277b1fbd-04d1-4c8a-a749-f4c3d6c6d282";

        // Prepare the user data to send to the database
        const userUpdate = {
          userName: data.name,
          userEmail: data.email,
          profileStatus: "Approved",
          userPoint: 100,
          profileImg: defaultImgUrl,
        };

        // Send the user data to the database
        const url = `http://localhost:5000/add-profile-info`;
        await axios.post(url, userUpdate, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Navigate to the user dashboard
        navigate("/user-dashboard");
        window.location.href = "/user-dashboard";
      } else {
        throw new Error("User creation failed");
      }
    } catch (error) {
      console.error("Error during signup or data submission:", error);
      // Handle the error, e.g., show a message to the user
    }
  };

  // Navigate after successful registration
  useEffect(() => {
    if (user || gUser) {
      navigate("/user-dashboard");
    }
  }, [user, gUser, navigate]);
  // Function to get custom error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/operation-not-allowed":
        return "Email/Password accounts are not enabled. Enable email/password in the Firebase console.";
      case "auth/weak-password":
        return "The password is too weak. Please choose a stronger password.";
      case "auth/popup-closed-by-user":
        return "The popup has been closed before completing the sign in.";
      case "auth/cancelled-popup-request":
        return "Popup request was canceled. Please try again.";
      case "auth/invalid-login-credentials":
        return "Invalid login credentials. Please check your email and password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  if (loading || gLoading || updating) {
    return <Loading />;
  }

  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500 text-center">
        {getErrorMessage(error?.code || gError?.code || updateError?.code)}
      </p>
    );
  }

  return (
    <>
      <div className="account-section bg-light-2 section-padding-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
              <div className="account-heading-block">
                <div className="account-heading">
                  <h2 className="account-heading__title heading-md">Create an account</h2>
                  <p>Enter the information below to create your account</p>
                </div>
              </div>
              <form className="account_comment-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="account_comment-box__form-inner">
                  <div className="account_comment-box__form-input">
                    <h2 className="account-title">Your Name</h2>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className={`form-control bg-white ${errors.name ? "is-invalid" : ""}`}
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is Required",
                        },
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                  </div>
                  <div className="account_comment-box__form-input">
                    <h2 className="account-title">Email Address</h2>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      className={`form-control bg-white ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is Required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid Email",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>
                  <div className="account_comment-box__form-input">
                    <h2 className="account-title">Password*</h2>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className={`form-control bg-white ${errors.password ? "is-invalid" : ""}`}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is Required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
                        },
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </div>
                  {signInError && (
                    <div className="text-danger text-center">{signInError}</div>
                  )}

                  <div className="account_comment-box__form-input-button">
                    <button type="submit" className="btn-masco rounded-pill w-100">Create Account</button>
                    <div className="button-bottom-text">
                      <span>Already have an account?<Link to="/login">Sign in now</Link></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
