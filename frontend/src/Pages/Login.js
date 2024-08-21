import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [userMail] = useAuthState(auth);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userMail) {
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [userMail, from, navigate]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const errorMessages = {
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'This user has been disabled.',
    'auth/too-many-requests': 'Too many requests. Please try again later.',
    'auth/invalid-login-credentials': 'Invalid login credentials. Please check your email and password.',
    'default': 'An unexpected error occurred. Please try again.'
  };

  const getErrorMessage = (error) => {
    if (!error) return null;
    return errorMessages[error.code] || errorMessages['default'];
  };

  if (loading || gLoading) {
    return <Loading />;
  }

  const signInError = getErrorMessage(error) || getErrorMessage(gError);

  return (
    <div className="account-section bg-light-2 section-padding-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-10">
            <div className="account-heading-block">
              <div className="account-heading">
                <h2 className="account-heading__title heading-md">Welcome back</h2>
                <p>Enter your account details below to sign in</p>
              </div>
            </div>
            <form className="account_comment-box" onSubmit={handleSubmit(onSubmit)}>
              <div className="account_comment-box__form-inner">
                <div className="account_comment-box__form-input">
                  <h2 className="account-title">Email address</h2>
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
                {signInError && <div className="text-danger text-center"><small>{signInError}</small></div>}
                <div className="account-condition-block">
                  <Link to="/reset">Forget password?</Link>
                </div>
                <div className="account_comment-box__form-input-button">
                  <button type="submit" className="btn-masco rounded-pill w-100">
                    Login Now
                  </button>
                  <div className="button-bottom-text">
                    <span>
                      Don’t have an account?
                      <Link to="/register">Create an account</Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
