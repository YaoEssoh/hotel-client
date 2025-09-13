import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [Email, setEmail] = useState({ email: "" });

  const OnchangeHandler = (e) => {
    setEmail({ ...Email, [e.target.name]: e.target.value });
  };

  const Forgot = async (event) => {
    event.preventDefault();
    try {
      const response = await api.Forgot(Email);

      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Please check your email for the password reset link",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error sending email:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to send reset email",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container-xxl bg-white p-0">
      {/* Page Header */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Forgot Password
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/forgot-password">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Forgot Password
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Password Reset Form */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Password Recovery
            </h6>
            <h1 className="mb-5">
              <span className="text-primary text-uppercase">Reset</span> Your
              Password
            </h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={Forgot}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={OnchangeHandler}
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Reset Link
                    </button>
                  </div>
                  <div className="col-12 text-center">
                    <p className="mb-0">
                      Remember your password?{" "}
                      <Link to="/login" className="text-primary">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
