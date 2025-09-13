import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import Swal from "sweetalert2";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const Reset = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Validate passwords match
      if (Password !== ConfirmPass) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Password and Confirm Password must be the same",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      // Validate password strength (optional)
      if (Password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Weak Password",
          text: "Password must be at least 6 characters long",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      
const response = await api.Reset(token, { newMotsDePass: Password });

      console.log('====================================');
      console.log("Password: ", Password);
      console.log('====================================');

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully reset",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Password reset error:", error);

      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          error.response?.data?.message ||
          "Failed to reset password. The link may have expired.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
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
              Reset Password
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/reset-password">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Reset Password
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
              New Password
            </h6>
            <h1 className="mb-5">
              <span className="text-primary text-uppercase">Create</span> New
              Password
            </h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={Reset}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="password"
                        placeholder="New Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                      />
                      <label htmlFor="newPassword">New Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={ConfirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                        minLength="6"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="ms-2">Updating...</span>
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </div>
                  <div className="col-12 text-center">
                    <p className="mb-0">
                      Back to{" "}
                      <Link to="/login" className="text-primary">
                        Login
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

export default ResetPassword;
